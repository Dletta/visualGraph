'use strict'

/**
 * Module Dependencies
 * @ignore
 */
const OperationNotSupportedError = require('../OperationNotSupportedError')

/**
 * KeyType
 * @ignore
 */
class KeyType {

  /**
   * constructor
   *
   * @class KeyType
   *
   * @internal For internal use only
   *
   * @description
   * Abstract KeyType class
   */
  constructor (params) {
    this.params = params
  }

  /**
   * IMPORT
   * @ignore
   */

  fromPrivatePKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  fromPrivatePKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  fromPublicPKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  fromPublicPKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  fromPrivateBlk (key) {
    throw new OperationNotSupportedError()
  }

  fromPublicBlk (key) {
    throw new OperationNotSupportedError()
  }

  fromJwk (key) {
    throw new OperationNotSupportedError()
  }

  /**
   * EXPORT
   * @ignore
   */

  toPrivatePKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  toPrivatePKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  toPublicPKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  toPublicPKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  toPrivateBlk (key) {
    throw new OperationNotSupportedError()
  }

  toPublicBlk (key) {
    throw new OperationNotSupportedError()
  }

  toPrivateJwk (key) {
    throw new OperationNotSupportedError()
  }

  toPublicJwk (key) {
    throw new OperationNotSupportedError()
  }

  /**
   * HELPERS
   * @ignore
   */

  static formatPem (base64pem, descriptor) {
    return `-----BEGIN ${descriptor} KEY-----\n`
    + base64pem.match(/.{1,64}/g).join('\n')
    + `\n-----END ${descriptor} KEY-----`
  }
}

/**
 * Export
 * @ignore
 */
module.exports = KeyType
