/* eslint-disable strict, no-eval*/

/*
	This may well be the worst code I've ever written.
	...
	but it's really cool.

	It's also the reason you should never use panic
	in user-facing code.

	This module takes a function string and magically
	(dangerously) turns it into a function using `eval`.
	The variables are named all shouty because eval can see
	local scope variables.
*/

/**
 * Take a function string and evaluate it,
 * optionally injecting local variables.
 * @param {String} PANIC_SRC_STR - A function string to parse.
 * @return {Function} - The resulting function reference.
 */
module.exports = function (PANIC_SRC_STR) {

	/** IE6 doesn't like anon function expressions. */
	var PANIC_CB_FUNCTION;

	eval('PANIC_CB_FUNCTION = ' + PANIC_SRC_STR);

	return PANIC_CB_FUNCTION;
};
