'use strict'

/**
 * Dependencies
 * @ignore
 */
const asn = require('asn1.js')

/**
 * SupportedAsnTypes
 * @ignore
 */
class SupportedAsnTypes {

  /**
   * constructor
   *
   * @class SupportedAsnTypes
   *
   * @description
   * A registry for supported asn complex field types
   */
  constructor () {
    Object.defineProperty(this, '_registry', { value: {} })
  }

  get registry () {
    return this._registry
  }

  define (name, fn) {
    this._registry[name] = asn.define(name, fn(this))
  }

  normalize (name) {
    return this.registry[name]
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SupportedAsnTypes
