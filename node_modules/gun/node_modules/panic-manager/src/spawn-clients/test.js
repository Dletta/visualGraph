'use strict';
const { describe, it, afterEach } = require('mocha');
const expect = require('expect');
const { join } = require('path');
const ChildProcess = require('child_process');
const { spyOn } = expect;
const spy = spyOn(ChildProcess, 'fork');
const spawn = require('./index.js');

describe('The client creator', () => {

	const client = join(__dirname, '../node-process/client.js');

	afterEach(() => spy.reset());

	it('should spawn node clients on demand', () => {
		spawn({
			clients: [{ type: 'node' }],
			panic: 'url',
		});

		expect(spy).toHaveBeenCalledWith(
			client,
			['url']
		);
	});

	it('should spin up the number of clients given', () => {
		spawn({
			clients: Array(5).fill({ type: 'node' }),
			panic: 'panic',
		});

		expect(spy.calls.length).toBe(5);
	});

});
