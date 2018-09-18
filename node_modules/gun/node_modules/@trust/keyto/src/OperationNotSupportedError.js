'use strict'

/**
 * OperationNotSupportedError
 * @ignore
 */
class OperationNotSupportedError extends Error {

  /**
   * constructor
   *
   * @class OperationNotSupportedError
   *
   * @description
   * Thrown when an operation has not been implemented yet
   *
   * @throws "This has not been implemented yet"
   *
   * @return {OperationNotSupportedError}
   */
  constructor () {
    super('This has not been implemented yet')
  }
}

/**
 * Export
 * @ignore
 */
module.exports = OperationNotSupportedError
