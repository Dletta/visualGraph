'use strict'

/**
 * InvalidOperationError
 * @ignore
 */
class InvalidOperationError extends Error {

  /**
   * constructor
   *
   * @class InvalidOperationError
   *
   * @description
   * Thrown when an operation has not been implemented yet
   *
   * @throws "This operation is not supported for this key type"
   *
   * @return {InvalidOperationError}
   */
  constructor (msg) {
    super(msg || 'This operation is not supported for this key type')
  }
}

/**
 * Export
 * @ignore
 */
module.exports = InvalidOperationError
