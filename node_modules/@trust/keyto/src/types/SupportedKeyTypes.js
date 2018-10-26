'use strict'

/**
 * SupportedKeyTypes
 * @ignore
 */
class SupportedKeyTypes {

  /**
   * constructor
   *
   * @internal
   * For internal use.
   *
   * @class SupportedKeyTypes
   *
   * @description
   * A registry for supported asn key types
   */
  constructor () {
    this.registry = []
    this.classes = {}
  }

  /**
   * find
   *
   * @param  {Function} fn
   * @return {Object}
   */
  find (fn) {
    return this.registry.find(fn)
  }

  /**
   * define
   *
   * @param  {Object} params
   * @param  {KeyType} cls
   */
  define (params, cls) {
    params.forEach(param => {
      let { kty } = param

      if (!kty) {
        throw new Error('Invalid type definition')
      }

      if (!this.classes[kty]) {
        this.classes[kty] = cls
      }

      this.registry.push(param)
    })
  }

  /**
   * normalize
   *
   * @param  {String} kty
   * @param  {String} field
   * @param  {Any} value
   * @return {KeyType}
   */
  normalize (kty, field, value) {
    let type = this.classes[kty]
    let params = this.find(params => params[field] === value)

    if (!type || !params) {
      throw new Error('Invalid type')
    }

    return new type(params)
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SupportedKeyTypes
