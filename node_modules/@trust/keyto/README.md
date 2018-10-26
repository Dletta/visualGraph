# Keyto _(@trust/keyto)_

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://travis-ci.org/EternalDeiwos/keyto.svg?branch=master)](https://travis-ci.org/EternalDeiwos/keyto)
[![codecov](https://codecov.io/gh/EternalDeiwos/keyto/branch/master/graph/badge.svg)](https://codecov.io/gh/EternalDeiwos/keyto)

> A utility for translating cryptographic keys between representations.

Keyto is pronounced 'key-to'.

Full project documentation is available [here](https://eternaldeiwos.github.io/keyto).

## Table of Contents

- [Status](#status)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Status

### SemVer Notice

This library is currently experimental. Until v1.0.0 is released, breaking changes will only incur a minor version increment.

### RSA

- [x] PKCS1
- [x] PKCS8
- [x] JWK

### ECDSA - secp256k1 (Blockchain Curve)

- [x] PKCS1 (Private Only)
- [x] PKCS8
- [x] JWK
- [x] BLK (Private Key Hex String)

### ECDSA - secp256r1 (P-256)

- [x] PKCS1 (Private Only)
- [x] PKCS8
- [x] JWK

### ECDSA - secp384r1 (P-384)

- [x] PKCS1 (Private Only)
- [x] PKCS8
- [x] JWK

### ECDSA - secp521r1 (P-521)

- [x] PKCS1 (Private Only)
- [x] PKCS8
- [x] JWK

### EDDSA - ed25519

- [ ] PKCS1
- [ ] PKCS8
- [ ] JWK
- [ ] BLK

## Install

```bash
$ npm install @trust/keyto --save
```

## Usage

Translate Private PEM to Public JWK:

```js
const keyto = require('@trust/keyto')

let pemPrivate = getPrivatePemStringSomehow()
let jwk = getPublicJwkSomehow()

// String data can either be passed in directly:
let key = keyto.from(pemPrivate, 'pem').toJwk('public')

// Or can be passed in as an object instead:
let key = keyto.from({ key: pemPrivate }, 'pem').toJwk('public')
assertEqual(jwk, key)
```

Translate Private Hex (Blockchain) Key to PKCS8 Public PEM:

```js
const keyto = require('@trust/keyto')

let blk = getPrivateBlockchainHexStringSomehow()
let pemPublic = getPublicPemSomehow()

let key = keyto.from(blk, 'blk').toString('pem', 'public_pkcs8')
assertEqual(pemPublic, key)
```

## API

### keyto.from(key, format) -> {Key}

**args**:

* key := (String|JWK)
* format := String

**format**:

Format can be any of these: 'pem', 'jwk' or 'blk'.

* format = pem: will parse a PEM encoded string (as per OpenSSL output).
* format = jwk: will parse a JWK object or JSON String
* format = blk: will parse a hex encoded key string as used on various blockchains (limited to secp256k1 keys).

### {Key}.toJwk(selector = 'public') -> {JWK}

**args**:

* selector := String

**selector**:

Selector can be any of these: 'public', 'private'.

* selector := public: will produce a public JWK.
* selector := private: will produce a private JWK.

### {Key}.toString(format = 'pem', selector = 'public') -> {String}

**args**:

* format := String
* selector := String

**format**:

Format can be any of these: 'pem', 'jwk' or 'blk'.

* format = pem: will produce a PEM encoded string (as per OpenSSL output).
* format = jwk: will produce a stringified JWK.
* format = blk: will produce a hex encoded key string as used on various blockchains (limited to secp256k1 keys).

**selector**:

Selector can be any of these: 'public', 'private', 'public_pkcs1', 'public_pkcs8', 'private_pkcs1' or 'private_pkcs8'.

* selector = public: will produce a public key.
* selector = private: will produce a private key.
* selector = public_pkcs1: will produce a public key according to the PKCS1 ASN Schema. Only relevant to DER related encodings.
* selector = public_pkcs8: will produce a public key according to the PKCS8 ASN Schema. Only relevant to DER related encodings.
* selector = private_pkcs1: will produce a private key according to the PKCS1 ASN Schema. Only relevant to DER related encodings.
* selector = private_pkcs8: will produce a private key according to the PKCS8 ASN Schema. Only relevant to DER related encodings.


## Maintainers

[@EternalDeiwos](https://github.com/EternalDeiwos)
[@thelunararmy](https://github.com/thelunararmy)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2017-2018 Greg Linklater
