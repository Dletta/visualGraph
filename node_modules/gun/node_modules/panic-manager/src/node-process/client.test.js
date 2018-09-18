'use strict';

const { describe, it } = require('mocha');
const expect = require('expect');
const { spyOn } = expect;
const panic = require('panic-client');
const spy = spyOn(panic, 'server');

const url = 'http://localhost:8080';

process.argv[2] = url;

// Loading the file causes side effects.
// We're testing those effects.
require('./client.js');

describe('A new node client', () => {

	it('should auto-connect to panic server', () => {
		expect(spy).toHaveBeenCalledWith(url);
	});

});
