'use strict';

var io = require('socket.io-client');
var platform = require('platform');
var execute = require('./execute');
var panic = exports;

panic.platform = platform;
panic.socket = null;

/**
 * Handshakes with a panic server.
 * @param  {String} url - The root-relative URL to a panic server.
 * @return {Socket} - A new socket.io instance.
 */
panic.server = function (url) {
	var socket = panic.socket = io.connect(url);

	/** Do whatever the server says. */
	socket.on('run', function (source, id, props) {
		execute(socket, {
			source: source,
			props: props,
			id: id
		});
	});

	/** Perform an initial handshake. */
	socket.emit('handshake', platform);

	return socket;
};

if (typeof window !== 'undefined') {
	window.panic = panic;
}
