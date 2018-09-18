'use strict';
var Promise = require('bluebird');
var isPromise = require('is-promise');
var platform = require('platform');

/**
 * Shared state object across jobs.
 * Used for storing and accessing variables
 * created in other jobs.
 * @type {Object}
 */
var state = {};

/**
 * Utility methods and environment properties
 * for jobs to use.
 * @param {Object} props - Properties to expose as `this.props`.
 * @class Context
 */
function Context (props) {
	this.props = props || {};
}

Context.prototype = {
	constructor: Context,

	/** The platform.js object. */
	platform: platform,

	/** Flag, whether it's an async job. */
	isAsync: false,

	/**
	 * Marks a function as async, and won't finish until
	 * done or fail is called.
	 * @returns {Function} - The done callback.
	 */
	'async': function () {
		this.isAsync = true;

		return this.done;
	},

	/**
	 * Add a value to a shared object, so other
	 * jobs can access it. Can be overwritten.
	 * @param {String} name - The name of the value.
	 * @param {Mixed} value - Any value.
	 * @returns {Mixed} - The value you just set.
	 */
	set: function (name, value) {
		state[name] = value;

		return value;
	},

	/**
	 * Retrieves a value that was previously set
	 * (using `.set()`).
	 * @param  {String} name - The name of the value to get.
	 * @return {Mixed} - Whatever the value is, or undefined
	 * if it doesn't exist.
	 */
	get: function (name) {

		/** Ignore properties from Object's prototype. */
		if (state.hasOwnProperty(name) === false) {
			return undefined;
		}

		return state[name];
	}
};

/**
 * Runs jobs, reports success or failure,
 * and exposes them to any props they were
 * sent with.
 * @param  {Function} job - The function to run.
 * @param  {Object} props - Variables to give to the job.
 * @return {Promise} - Resolves when the job finishes,
 * rejects if it fails.
 */
function runner (job, props) {
	var context = new Context(props);

	/** Represents success/failure of the job. */
	return new Promise(function (done, fail) {

		/** Expose the reject/resolve hooks to the job. */
		context.done = done;
		context.fail = fail;

		/** Start the job. */
		var result = job.call(context, context);

		/** Check if the job called `.async()`. */
		if (context.isAsync) {
			return;
		}

		if (isPromise(result)) {

			/** If the value is a promise, wait for it. */
			result.then(done).catch(fail);
		} else {

			/** Otherwise, resolve immediately. */
			done(result);
		}
	});
}

module.exports = runner;
