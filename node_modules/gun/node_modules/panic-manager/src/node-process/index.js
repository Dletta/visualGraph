'use strict';

var fork = require('child_process').fork;
var join = require('path').join;
var client = join(__dirname, 'client.js');

/**
 * Spawn a new node process and connect it to
 * the panic url given.
 *
 * @param  {String} panic - The url to a panic server.
 * @returns {ChildProcess} - The new child process.
 */
function node (panic) {
	return fork(client, [panic]);
}

module.exports = node;
