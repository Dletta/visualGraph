/**
 * Test Dependencies
 * @ignore
 */
const cwd = process.cwd()
const path = require('path')
const chai = require('chai')
const expect = chai.expect

/**
 * Assertions
 * @ignore
 */
chai.should()

/**
 * Code Under Test
 * @ignore
 */
const keyto = require(path.join(cwd, 'src'))

/**
 * Test Consts
 * @ignore
 */
const {
  RSA: {
    RS256: {
      publicPKCS1: rsaPublicPKCS1,
      publicPKCS8: rsaPublicPKCS8,
      publicJwk: rsaPublicJwk,
      privatePKCS8: rsaPrivatePKCS8,
      privatePKCS1: rsaPrivatePKCS1,
      privateJwk: rsaPrivateJwk
    }
  },
  ECDSA: {
    K256: {
      publicPKCS8: k256PublicPKCS8,
      publicJwk: k256PublicJwk,
      privatePKCS8: k256PrivatePKCS8,
      privatePKCS1: k256PrivatePKCS1,
      privateJwk: k256PrivateJwk,
      privateHex: k256PrivateHex,
      publicHex: k256PublicHex
    },
    P256: {
      publicPKCS8: p256PublicPKCS8,
      publicJwk: p256PublicJwk,
      privatePKCS8: p256PrivatePKCS8,
      privatePKCS1: p256PrivatePKCS1,
      privateJwk: p256PrivateJwk,
    },
    P384: {
      publicPKCS8: p384PublicPKCS8,
      publicJwk: p384PublicJwk,
      privatePKCS8: p384PrivatePKCS8,
      privatePKCS1: p384PrivatePKCS1,
      privateJwk: p384PrivateJwk,
    },
    P521: {
      publicPKCS8: p521PublicPKCS8,
      publicJwk: p521PublicJwk,
      privatePKCS8: p521PrivatePKCS8,
      privatePKCS1: p521PrivatePKCS1,
      privateJwk: p521PrivateJwk,
    },
  }
} = require(path.join(cwd, 'test', 'keys'))

/**
 * Tests
 */
describe('keyto', () => {

  describe('RSA', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(rsaPublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(rsaPublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(rsaPrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(rsaPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(rsaPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(rsaPrivateJwk)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(rsaPrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(rsaPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(rsaPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(rsaPrivateJwk)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(rsaPrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(rsaPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(rsaPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(rsaPrivateJwk)
      })
    })
  })

  describe('ECDSA secp256k1', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(k256PublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateHex', () => {
        expect(() => key.toString('blk', 'private')).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(k256PublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateHex', () => {
        expect(() => key.toString('blk', 'private')).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicHex', () => {

      let key
      before(() => {
        key = keyto.from(k256PublicHex, 'blk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateHex', () => {
        expect(() => key.toString('blk', 'private')).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(k256PrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(k256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(k256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(k256PrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(k256PrivateHex)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(k256PrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(k256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(k256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(k256PrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(k256PrivateHex)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(k256PrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(k256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(k256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(k256PrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(k256PrivateHex)
      })
    })

    describe('privateHex', () => {

      let key
      before(() => {
        key = keyto.from(k256PrivateHex, 'blk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(k256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(k256PublicJwk)
      })

      it('should convert to publicHex', () => {
        key.toString('blk', 'public').should.equal(k256PublicHex)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(k256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(k256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(k256PrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(k256PrivateHex)
      })
    })
  })

  describe('ECDSA prime256v1', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(p256PublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p256PublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(p256PublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p256PublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(p256PrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p256PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p256PrivateJwk)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(p256PrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p256PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p256PrivateJwk)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(p256PrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p256PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p256PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p256PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p256PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p256PrivateJwk)
      })
    })
  })

  describe('ECDSA secp384r1', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(p384PublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p384PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p384PublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(p384PublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p384PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p384PublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(p384PrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p384PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p384PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p384PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p384PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p384PrivateJwk)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(p384PrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p384PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p384PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p384PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p384PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p384PrivateJwk)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(p384PrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p384PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p384PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p384PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p384PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p384PrivateJwk)
      })
    })
  })

  describe('ECDSA secp521r1', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(p521PublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p521PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p521PublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(p521PublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p521PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p521PublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(p521PrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p521PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p521PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p521PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p521PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p521PrivateJwk)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(p521PrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p521PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p521PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p521PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p521PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p521PrivateJwk)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(p521PrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        expect(() => key.toString('pem', 'public_pkcs1')).to.throw('This has not been implemented yet')
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(p521PublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(p521PublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(p521PrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(p521PrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(p521PrivateJwk)
      })
    })
  })
})
