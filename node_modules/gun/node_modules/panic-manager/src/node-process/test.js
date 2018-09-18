'use strict';
const { describe, it, afterEach } = require('mocha');
const expect = require('expect');
const { spyOn } = expect;
const Child = require('child_process');
const spy = spyOn(Child, 'fork');
const create = require('./index');
const { join } = require('path');

describe('Creating a node panic client', () => {

	afterEach(() => spy.reset());

	const url = 'http://localhost:8080';
	const file = join(__dirname, 'client.js');

	it('should fork a new process', () => {
		create(url);
		expect(spy).toHaveBeenCalledWith(file, [url]);
	});

	it('should return the new child process', () => {
		spy.andReturn('value');
		const result = create(url);
		expect(result).toBe('value');
	});

});
