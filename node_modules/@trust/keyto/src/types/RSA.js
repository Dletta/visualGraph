'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const KeyType = require('./KeyType')
const InvalidOperationError = require('../InvalidOperationError')
const Converter = require('../Converter')
const asn = require('../asn1')

/**
 * RSA
 * @class RSA
 *
 * @extends {KeyType}
 *
 * @description
 * RSA conversion implementation
 */
class RSA extends KeyType {

  /**
   * IMPORT
   * @ignore
   */

  fromPrivatePKCS1 (key) {
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let { n, e, d, p, q, dp, dq, qi } = RSAPrivateKey.decode(key, 'der')

    return {
      n: Converter.convert(n, 'bn', 'raw'),
      e: Converter.convert(e, 'bn', 'raw'),
      d: Converter.convert(d, 'bn', 'raw'),
      p: Converter.convert(p, 'bn', 'raw'),
      q: Converter.convert(q, 'bn', 'raw'),
      dp: Converter.convert(dp, 'bn', 'raw'),
      dq: Converter.convert(dq, 'bn', 'raw'),
      qi: Converter.convert(qi, 'bn', 'raw'),
    }
  }

  fromPrivatePKCS8 (key) {
    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let info = PrivateKeyInfo.decode(key, 'der')
    let { n, e, d, p, q, dp, dq, qi } = RSAPrivateKey.decode(info.privateKey, 'der')

    return {
      n: Converter.convert(n, 'bn', 'raw'),
      e: Converter.convert(e, 'bn', 'raw'),
      d: Converter.convert(d, 'bn', 'raw'),
      p: Converter.convert(p, 'bn', 'raw'),
      q: Converter.convert(q, 'bn', 'raw'),
      dp: Converter.convert(dp, 'bn', 'raw'),
      dq: Converter.convert(dq, 'bn', 'raw'),
      qi: Converter.convert(qi, 'bn', 'raw'),
    }
  }

  fromPublicPKCS1 (key) {
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let { n, e } = RSAPublicKey.decode(key, 'der')

    return {
      n: Converter.convert(n, 'bn', 'raw'),
      e: Converter.convert(e, 'bn', 'raw'),
    }
  }

  fromPublicPKCS8 (key) {
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let info = PublicKeyInfo.decode(key, 'der')
    let { n, e } = RSAPublicKey.decode(info.publicKey.data, 'der')

    return {
      n: Converter.convert(n, 'bn', 'raw'),
      e: Converter.convert(e, 'bn', 'raw'),
    }
  }

  fromJwk (key) {
    let { n, e, d, p, q, dp, dq, qi, alg } = key

    return {
      n: Converter.convert(n, 'base64url', 'raw'),
      e: Converter.convert(e, 'base64url', 'raw'),
      d: Converter.convert(d, 'base64url', 'raw'),
      p: Converter.convert(p, 'base64url', 'raw'),
      q: Converter.convert(q, 'base64url', 'raw'),
      dp: Converter.convert(dp, 'base64url', 'raw'),
      dq: Converter.convert(dq, 'base64url', 'raw'),
      qi: Converter.convert(qi, 'base64url', 'raw'),
    }
  }

  /**
   * EXPORT
   * @ignore
   */

  toPrivatePKCS1 (key) {
    let { n, e, d, p, q, dp, dq, qi } = key
    let { version } = this.params
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let base64pem = RSAPrivateKey.encode({
      version,
      n: Converter.convert(n, 'raw', 'bn'),
      e: Converter.convert(e, 'raw', 'bn'),
      d: Converter.convert(d, 'raw', 'bn'),
      p: Converter.convert(p, 'raw', 'bn'),
      q: Converter.convert(q, 'raw', 'bn'),
      dp: Converter.convert(dp, 'raw', 'bn'),
      dq: Converter.convert(dq, 'raw', 'bn'),
      qi: Converter.convert(qi, 'raw', 'bn'),
    }, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'RSA PRIVATE')
  }

  toPrivatePKCS8 (key) {
    let { n, e, d, p, q, dp, dq, qi } = key
    let { oid, algParameters, version } = this.params
    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let privateKey = RSAPrivateKey.encode({
      version,
      n: Converter.convert(n, 'raw', 'bn'),
      e: Converter.convert(e, 'raw', 'bn'),
      d: Converter.convert(d, 'raw', 'bn'),
      p: Converter.convert(p, 'raw', 'bn'),
      q: Converter.convert(q, 'raw', 'bn'),
      dp: Converter.convert(dp, 'raw', 'bn'),
      dq: Converter.convert(dq, 'raw', 'bn'),
      qi: Converter.convert(qi, 'raw', 'bn'),
    }, 'der')

    let base64pem = PrivateKeyInfo.encode({
      version,
      algorithm: {
        algorithm: oid.split('.'),
        parameters: Buffer.from(algParameters, 'hex')
      },
      privateKey
    }, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'PRIVATE')
  }

  toPublicPKCS1 (key) {
    let { n, e } = key
    let { version } = this.params
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let base64pem = RSAPublicKey.encode({
      version,
      n: Converter.convert(n, 'raw', 'bn'),
      e: Converter.convert(e, 'raw', 'bn'),
    }, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'RSA PUBLIC')
  }

  toPublicPKCS8 (key) {
    let { n, e } = key
    let { oid, algParameters } = this.params
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let data = RSAPublicKey.encode({
      n: Converter.convert(n, 'raw', 'bn'),
      e: Converter.convert(e, 'raw', 'bn'),
    }, 'der')

    let base64pem = PublicKeyInfo.encode({
      algorithm: {
        algorithm: oid.split('.'),
        parameters: Buffer.from(algParameters, 'hex')
      },
      publicKey: {
        unused: 0,
        data
      }
    }, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'PUBLIC')
  }

  toPrivateJwk (key) {
    let { n, e, d, p, q, dp, dq, qi } = key
    let { kty } = this.params

    return {
      kty,
      n: Converter.convert(n, 'raw', 'base64url'),
      e: Converter.convert(e, 'raw', 'base64url'),
      d: Converter.convert(d, 'raw', 'base64url'),
      p: Converter.convert(p, 'raw', 'base64url'),
      q: Converter.convert(q, 'raw', 'base64url'),
      dp: Converter.convert(dp, 'raw', 'base64url'),
      dq: Converter.convert(dq, 'raw', 'base64url'),
      qi: Converter.convert(qi, 'raw', 'base64url'),
    }
  }

  toPublicJwk (key) {
    let { n, e } = key
    let { kty } = this.params

    return {
      kty,
      n: Converter.convert(n, 'raw', 'base64url'),
      e: Converter.convert(e, 'raw', 'base64url'),
    }
  }
}

/**
 * Export
 * @ignore
 */
module.exports = RSA
