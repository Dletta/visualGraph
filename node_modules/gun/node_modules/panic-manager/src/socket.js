/*
	This file adds testability to socket.io.
	It's used to mock out the server and client APIs.
*/

'use strict';

var server = require('socket.io');
var client = require('socket.io-client');

exports.server = server;
exports.client = client;
