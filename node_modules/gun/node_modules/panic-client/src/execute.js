'use strict';

var platform = require('platform');
var parse = require('./parser');
var runner = require('./runner');
var toString = Object.prototype.toString;

/**
 * Parse a function string, run it, then
 * report the success or failure.
 * @param  {Socket} socket - A socket.io client.
 * @param  {Object} job - Job details.
 * @param  {String} job.source - The function string.
 * @param  {Object} [job.props] - Variables to give to the job.
 * @param  {String} job.id - A unique job ID.
 * @return {Promise} - Resolves when the job is done.
 */
function execute (socket, job) {

	/** Parse the string into a function. */
	var fn = parse(job.source);

	/** Execute the function. */
	return runner(fn, job.props)
	.then(function (result) {
		var value;

		try {

			/** Make sure it's valid JSON. */
			JSON.stringify(result);
			value = result;
		} catch (error) {

			/** Otherwise, just send it's type. */
			value = toString.call(result);
		}

		return {
			value: value
		};
	})
	.catch(function (error) {

		/** Turn error strings into Error objects. */
		if (typeof error === 'string') {
			var message = error;
			error = new Error(message);
		}

		/** Supply a default error message. */
		if (!error.message) {
			error.message = 'Panic job failed, no error message given.';
		}

		/**
		 * Turn errors into something JSON
		 * can handle, plus some extra debugging info.
		 */
		return {
			error: {
				message: error.message,
				platform: platform,
				source: job.source
			}
		};

	})
	.then(function (report) {

		/** Report back to the panic-server. */
		socket.emit(job.id, report);
	});
}

module.exports = execute;
