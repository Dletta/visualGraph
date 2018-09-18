'use strict';
const { describe, it, beforeEach, afterEach } = require('mocha');

/* Spy setup */
const expect = require('expect');
const { spyOn, createSpy } = expect;

/* Child process spy */
const ChildProcess = require('child_process');
const fork = spyOn(ChildProcess, 'fork');

const sockets = require('./socket');
const Emitter = require('events');
const emitter = new Emitter();

/* Socket spies */
const socket = {
	of: createSpy().andReturn(emitter),
	server: spyOn(sockets, 'server'),
	client: spyOn(sockets, 'client').andReturn(emitter),
};

socket.server.andReturn({
	of: socket.of,
});

const { Server } = require('http');
const Manager = require('./Manager');

// Simple `.start()` config.
const config = {
	clients: [{ type: 'node' }],
	panic: 'http://localhost:1234',
};

afterEach(() => fork.reset());
afterEach(() => emitter.removeAllListeners());

describe('A local manager', () => {

	let manager;

	beforeEach(() => {
		manager = new Manager();
	});

	it('should be constructable without `new`', () => {
		const manager = Manager();
		expect(manager).toBeA(Manager);
	});

	it('should declare itself as local', () => {
		expect(manager.isRemote).toBe(false);
		expect(manager.socket).toBe(null);
	});

	describe('`.start()` call', () => {

		it('should throw if given no input', () => {
			const fail = () => manager.start();
			expect(fail).toThrow(/Missing configuration object/i);
		});

		it('should throw if not given a panic url', () => {
			const fail = () => manager.start({ clients: [] });
			expect(fail).toThrow(/config.panic/i);
		});

		it('should throw if not given a clients array', () => {
			const fail = () => manager.start({ panic: 'url' });
			expect(fail).toThrow(/config.clients/i);
		});

		it('should throw if a client is not an object', () => {
			const fail = () => manager.start({
				clients: [null],
				panic: 'url',
			});
			expect(fail).toThrow(/not an object/i);
		});

		it('should throw if a client is missing the type', () => {
			const fail = () => manager.start({
				clients: [{ noType: true }],
				panic: 'url',
			});
			expect(fail).toThrow(/client.type/i);
		});

		it('should spawn the requested processes', () => {
			manager.start({
				clients: [{ type: 'node' }],
				panic: 'url',
			});
			expect(fork).toHaveBeenCalled();
		});

	});

});

describe('A manager server', () => {

	it('should declare itself as local', () => {
		const manager = Manager(8080);
		expect(manager.isRemote).toBe(false);
	});

	it('should attach to the passed server', () => {
		const server = Server();
		Manager(server);
		expect(socket.server).toHaveBeenCalledWith(server);
	});

	it('should pass port numbers to socket.io', () => {
		Manager(8080);
		expect(socket.server).toHaveBeenCalledWith(8080);
	});

	it('should namespace to /panic-manager', () => {
		Manager(8080);
		expect(socket.of).toHaveBeenCalledWith('/panic-manager');
	});

	it('should spawn clients on socket "start" event', () => {
		Manager(8080);

		// Resolve to a fake socket.
		emitter.emit('connection', emitter);

		// It should be listening for "start" now.
		emitter.emit('start', {
			clients: [{ type: 'node' }],
			panic: 'potato.com',
		});

		// child_process.fork should have been triggered.
		expect(fork).toHaveBeenCalled();
	});

	describe('`.start()` call', () => {

		it('should only invoke `spawn-clients`', () => {
			const event = createSpy();
			const manager = Manager(8080);

			// Make sure "start" is never fired.
			manager.socket.on('start', event);
			manager.start(config);

			expect(event).toNotHaveBeenCalled();
			expect(fork).toHaveBeenCalled();
		});

	});

});

describe('A manager client', () => {

	let client;

	beforeEach(() => {
		client = Manager('http://url.com');
	});

	it('should declare itself as remote', () => {
		expect(client.isRemote).toBe(true);
	});

	describe('`.start()` call', () => {

		it('should emit on the remote socket', () => {
			const spy = createSpy();

			client.socket.on('start', spy);
			client.start(config);

			expect(spy).toHaveBeenCalledWith(config);
		});

		it('should not call `fork`', () => {
			client.start(config);
			expect(fork).toNotHaveBeenCalled();
		});

	});

});
