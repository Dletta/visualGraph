'use strict'

/**
 * Dependencies
 * @ignore
 */
const asn = require('asn1.js')
const base64url = require('base64url')

/**
 * Converter
 *
 * @class Converter
 *
 * @description
 * Utility class to convert between different data representations
 */
class Converter {

  /**
   * convert
   *
   * @description
   * Convert between data types. Available data types: raw, uint8_array, hex, base64, base64url and (bn | bignum)
   *
   * @throws
   * If fromType is not one of: raw, uint8_array, hex, base64, base64url or (bn | bignum)
   *
   * @throws
   * If toType is not one of: raw, uint8_array, hex, base64, base64url or (bn | bignum)
   *
   * @param  {(String|Array|Buffer|BigNumber)} data
   * @param  {String} fromType
   * @param  {String} toType
   * @return {String|BigNumber}
   */
  static convert(data, fromType, toType) {
    if (!data) {
      return undefined
    }

    if (fromType === toType) {
      return data
    }

    let buffer

    if (fromType === 'raw' || data instanceof Buffer) {
      buffer = data

    } else if (fromType === 'uint8_array' || Array.isArray(data)) {
      buffer = Buffer.from(data)

    } else if (fromType === 'hex') {
      buffer = Buffer.from(data, 'hex')

    } else if (fromType === 'base64') {
      buffer = Buffer.from(data, 'base64')

    } else if (fromType === 'base64url') {
      buffer = base64url.toBuffer(data)

    } else if (fromType === 'bn' || fromType === 'bignum') {
      buffer = Buffer.from(this.pad(data.toString(16)), 'hex')

    } else {
      throw new Error('Invalid fromType')
    }

    if (toType === 'raw') {
      return buffer

    } else if (toType === 'uint8_array') {
      return Array.from(buffer)

    } else if (toType === 'hex') {
      return buffer.toString('hex')

    } else if (toType === 'base64') {
      return buffer.toString('base64')

    } else if (toType === 'base64url') {
      return base64url.fromBase64(buffer.toString('base64'))

    } else if (toType === 'bn' || toType === 'bignum') {
      return new asn.bignum(buffer)

    } else {
      throw new Error('Invalid toType')
    }
  }

  /**
   * pad
   *
   * @description
   * Pad a hex string for octet parsing
   *
   * @param  {String} hex
   * @return {String}
   */
  static pad (hex) {
    return hex.length % 2 === 1 ? `0${hex}` : hex
  }


}

/**
 * Export
 * @ignore
 */
module.exports = Converter
