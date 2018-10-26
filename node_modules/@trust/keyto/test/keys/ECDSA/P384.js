'use strict'

/**
 * PEM
 * @ignore
 */
const privatePKCS1 = `-----BEGIN EC PRIVATE KEY-----
MIGkAgEBBDBYfv/x6wM9uoKFysiPkzR6ym58a7BYwzWW/8RUj2InDd2HdAusuXQy
IDwmjI92nnWgBwYFK4EEACKhZANiAARc3eBrrbfPaa7kF3FZchV4aHOcZsMeyoQp
oipMr1GWkLErCtx2hGpoLeqUg/KBw3s1V7LQPx7YqPHWKqB7z4pMIJ3tUyzejqZI
+dWN0LqWzqe03v7QzvIU1Q2qH8s8IrM=
-----END EC PRIVATE KEY-----`
const privatePKCS8 = `-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDBYfv/x6wM9uoKFysiP
kzR6ym58a7BYwzWW/8RUj2InDd2HdAusuXQyIDwmjI92nnWhZANiAARc3eBrrbfP
aa7kF3FZchV4aHOcZsMeyoQpoipMr1GWkLErCtx2hGpoLeqUg/KBw3s1V7LQPx7Y
qPHWKqB7z4pMIJ3tUyzejqZI+dWN0LqWzqe03v7QzvIU1Q2qH8s8IrM=
-----END PRIVATE KEY-----`
const publicPKCS8 = `-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEXN3ga623z2mu5BdxWXIVeGhznGbDHsqE
KaIqTK9RlpCxKwrcdoRqaC3qlIPygcN7NVey0D8e2Kjx1iqge8+KTCCd7VMs3o6m
SPnVjdC6ls6ntN7+0M7yFNUNqh/LPCKz
-----END PUBLIC KEY-----`

/**
 * JWK
 * @ignore
 */
const privateJwk = `{
  "kty": "EC",
  "crv": "P-384",
  "d": "WH7_8esDPbqChcrIj5M0espufGuwWMM1lv_EVI9iJw3dh3QLrLl0MiA8JoyPdp51",
  "x": "XN3ga623z2mu5BdxWXIVeGhznGbDHsqEKaIqTK9RlpCxKwrcdoRqaC3qlIPygcN7",
  "y": "NVey0D8e2Kjx1iqge8-KTCCd7VMs3o6mSPnVjdC6ls6ntN7-0M7yFNUNqh_LPCKz"
}`
const publicJwk = `{
  "kty": "EC",
  "crv": "P-384",
  "x": "XN3ga623z2mu5BdxWXIVeGhznGbDHsqEKaIqTK9RlpCxKwrcdoRqaC3qlIPygcN7",
  "y": "NVey0D8e2Kjx1iqge8-KTCCd7VMs3o6mSPnVjdC6ls6ntN7-0M7yFNUNqh_LPCKz"
}`

/**
 * Export
 * @ignore
 */
module.exports = {
  privatePKCS1,
  privatePKCS8,
  publicPKCS8,
  privateJwk,
  publicJwk,
}
