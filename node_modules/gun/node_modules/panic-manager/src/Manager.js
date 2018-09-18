'use strict';

var isArray = require('isarray');
var spawn = require('./spawn-clients');
var socket = require('./socket');

/**
 * Validate a config object.
 *
 * @throws {TypeError} - Reports any missing inputs.
 * @param  {Object} config - The configuration object.
 * @returns {undefined}
 */
function validate (config) {

	/** Make sure the config object was passed. */
	if (!config) {
		throw new TypeError('Missing configuration object.');
	}

	/** Make sure the panic url is provided. */
	if (typeof config.panic !== 'string') {
		throw new TypeError('Panic server URL "config.panic" not provided.');
	}

	/** Make sure config.clients is an array. */
	if (isArray(config.clients) === false) {
		throw new TypeError('"config.clients" is not an array.');
	}

	var str = JSON.stringify;

	/** Validate the client objects. */
	config.clients.forEach(function (client) {
		if (!client) {
			throw new Error('Client "' + client + '" is not an object.');
		}

		if (!client.type) {
			throw new Error('Missing client.type attribute: ' + str(client));
		}
	});
}

/**
 * Manage panic clients in bulk, either locally or remotely.
 *
 * @class Manager
 * @param {Mixed} remote - Either an http.Server to attach to,
 * a URL to connect to, or `undefined` if there is no remote.
 */
function Manager (remote) {

	/** Allow usage without `new`. */
	if (!(this instanceof Manager)) {
		return new Manager(remote);
	}

	/**
	 * @property {Boolean} isRemote
	 * Whether the manager is remote.
	 */
	this.isRemote = false;

	/**
	 * @property {Socket} socket
	 * A socket.io instance, or `null` if using locally.
	 */
	this.socket = null;

	/** If only using locally, stop here. */
	if (!remote) {
		return this;
	}

	/** If it's a URL, connect to it. */
	if (typeof remote === 'string') {
		this.isRemote = true;

		/** Automatically postfix the manager scope. */
		var url = remote + '/panic-manager';

		/** Connect to the remote manager. */
		this.socket = socket.client(url);

		return this;
	}

	/** Listen for /panic-manager connections. */
	var server = socket.server(remote).of('/panic-manager');

	/** Listen for connections. */
	server.on('connection', function (socket) {

		/** Listen for start commands. */
		socket.on('start', function (config) {
			spawn(config);
		});

	});

	this.socket = server;

}

Manager.prototype = {
	constructor: Manager,

	/**
	 * Dispatch the request to the manager responsible.
	 *
	 * @param  {Object} config - The configuration object.
	 * @returns {undefined}
	 */
	start: function (config) {

		/** May throw validation errors. */
		validate(config);

		if (this.isRemote) {

			/** Spawn the clients remotely. */
			this.socket.emit('start', config);
		} else {

			/** Spawn the clients locally. */
			spawn(config);
		}

	},
};

module.exports = Manager;
