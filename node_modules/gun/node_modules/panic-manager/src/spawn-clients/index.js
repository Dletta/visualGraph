'use strict';

var fork = require('../node-process');

/**
 * Create a bunch of panic clients.
 *
 * @param  {Object} config - A description of clients to generate.
 * @param  {String} config.panic - The url to a panic server.
 * @param  {Object[]} config.clients - A list of clients to generate.
 * Each should have a client "type" string.
 * @returns {undefined}
 *
 * @example
 * create({
 *   panic: 'http://localhost:8080',
 *   clients: [{ type: 'node' }],
 * })
 */
function create (config) {

	/** Generate each client as described. */
	config.clients.forEach(function (client) {
		if (client.type === 'node') {

			/** Fork a new node process. */
			fork(config.panic);
		}
	});
}

module.exports = create;
