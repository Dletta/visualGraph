'use strict'

/**
 * Module Depdendencies
 * @ignore
 */
const SupportedKeyTypes = require('./SupportedKeyTypes')
const RSA = require('./RSA')
const ECDSA = require('./ECDSA')
const EDDSA = require('./EDDSA')

/**
 * supportedKeyTypes
 * @ignore
 */
const supportedKeyTypes = new SupportedKeyTypes()

// RSA
supportedKeyTypes.define([
  {
    kty: 'RSA',
    oid: '1.2.840.113549.1.1.1',
    algParameters: '0500',
    version: 'two-prime',
  }
], RSA)

// ECDSA
supportedKeyTypes.define([
  {
    kty: 'EC',
    crv: 'K-256',
    oid: '1.2.840.10045.2.1',
    namedCurve: '1.3.132.0.10',
    algParameters: '06052b8104000a',
    keyVersion: 1,
    infoVersion: 'two-prime',
  },
  {
    kty: 'EC',
    crv: 'P-256',
    oid: '1.2.840.10045.2.1',
    namedCurve: '1.2.840.10045.3.1.7',
    algParameters: '06082a8648ce3d030107',
    keyVersion: 1,
    infoVersion: 'two-prime',
  },
  {
    kty: 'EC',
    crv: 'P-384',
    oid: '1.2.840.10045.2.1',
    namedCurve: '1.3.132.0.34',
    algParameters: '06052b81040022',
    keyVersion: 1,
    infoVersion: 'two-prime',
  },
  {
    kty: 'EC',
    crv: 'P-521',
    oid: '1.2.840.10045.2.1',
    namedCurve: '1.3.132.0.35',
    algParameters: '06052b81040023',
    keyVersion: 1,
    infoVersion: 'two-prime',
  },
], ECDSA)

// EDDSA
supportedKeyTypes.define([
], EDDSA)

/**
 * Export
 * @ignore
 */
module.exports = supportedKeyTypes
