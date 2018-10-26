'use strict'

/**
 * PEM
 * @ignore
 */
const privatePKCS1 = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIN7doxnaLI4GtVJ9+X5sHqFjJIA5jWLB3mKZE2O9O1mBoAoGCCqGSM49
AwEHoUQDQgAEbag3R0FTUvlLJGEM7zEhY2IGJgoEN4Q4UA7eR5Uh7BEIzXBGuT/3
S9cNXKa6mWLTLIcBxEFVLcx1AVQJKrkFXQ==
-----END EC PRIVATE KEY-----`
const privatePKCS8 = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg3t2jGdosjga1Un35
fmweoWMkgDmNYsHeYpkTY707WYGhRANCAARtqDdHQVNS+UskYQzvMSFjYgYmCgQ3
hDhQDt5HlSHsEQjNcEa5P/dL1w1cprqZYtMshwHEQVUtzHUBVAkquQVd
-----END PRIVATE KEY-----`
const publicPKCS8 = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEbag3R0FTUvlLJGEM7zEhY2IGJgoE
N4Q4UA7eR5Uh7BEIzXBGuT/3S9cNXKa6mWLTLIcBxEFVLcx1AVQJKrkFXQ==
-----END PUBLIC KEY-----`

/**
 * JWK
 * @ignore
 */
const privateJwk = `{
  "kty": "EC",
  "crv": "P-256",
  "d": "3t2jGdosjga1Un35fmweoWMkgDmNYsHeYpkTY707WYE",
  "x": "bag3R0FTUvlLJGEM7zEhY2IGJgoEN4Q4UA7eR5Uh7BE",
  "y": "CM1wRrk_90vXDVymupli0yyHAcRBVS3MdQFUCSq5BV0"
}`
const publicJwk = `{
  "kty": "EC",
  "crv": "P-256",
  "x": "bag3R0FTUvlLJGEM7zEhY2IGJgoEN4Q4UA7eR5Uh7BE",
  "y": "CM1wRrk_90vXDVymupli0yyHAcRBVS3MdQFUCSq5BV0"
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
