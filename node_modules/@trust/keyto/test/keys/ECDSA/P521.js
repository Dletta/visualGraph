'use strict'

/**
 * PEM
 * @ignore
 */
const privatePKCS1 = `-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIBp7eAMe6QHQ4Av4tEfeVYFQUn3nWHFFEAfyqOcjSUHzPFmNQpH2kM
wFpZu6XPxauBTVTnFW8QAtD1ov1L6V7aHpagBwYFK4EEACOhgYkDgYYABAFHzefo
k5MWo1mRqDXvo8zQqUsnb6JeTKyn/kD0tJP92cYFutmHTq3rKQF2Kyvvhv339iKB
q11jsNpLjNCVooqDpwEHOpuFthlQH1isX96oQrSo+pxgkMQjUxxeeAF/mIeINu9S
2H/FYFvG7IU/O+0iTiY5GGmyiXPDThv5adXMH3zn6g==
-----END EC PRIVATE KEY-----`
const privatePKCS8 = `-----BEGIN PRIVATE KEY-----
MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBp7eAMe6QHQ4Av4tE
feVYFQUn3nWHFFEAfyqOcjSUHzPFmNQpH2kMwFpZu6XPxauBTVTnFW8QAtD1ov1L
6V7aHpahgYkDgYYABAFHzefok5MWo1mRqDXvo8zQqUsnb6JeTKyn/kD0tJP92cYF
utmHTq3rKQF2Kyvvhv339iKBq11jsNpLjNCVooqDpwEHOpuFthlQH1isX96oQrSo
+pxgkMQjUxxeeAF/mIeINu9S2H/FYFvG7IU/O+0iTiY5GGmyiXPDThv5adXMH3zn
6g==
-----END PRIVATE KEY-----`
const publicPKCS8 = `-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBR83n6JOTFqNZkag176PM0KlLJ2+i
Xkysp/5A9LST/dnGBbrZh06t6ykBdisr74b99/YigatdY7DaS4zQlaKKg6cBBzqb
hbYZUB9YrF/eqEK0qPqcYJDEI1McXngBf5iHiDbvUth/xWBbxuyFPzvtIk4mORhp
solzw04b+WnVzB985+o=
-----END PUBLIC KEY-----`

/**
 * JWK
 * @ignore
 */
const privateJwk = `{
  "kty": "EC",
  "crv": "P-521",
  "d": "Aae3gDHukB0OAL-LRH3lWBUFJ951hxRRAH8qjnI0lB8zxZjUKR9pDMBaWbulz8WrgU1U5xVvEALQ9aL9S-le2h6W",
  "x": "AUfN5-iTkxajWZGoNe-jzNCpSydvol5MrKf-QPS0k_3ZxgW62YdOrespAXYrK--G_ff2IoGrXWOw2kuM0JWiioOn",
  "y": "AQc6m4W2GVAfWKxf3qhCtKj6nGCQxCNTHF54AX-Yh4g271LYf8VgW8bshT877SJOJjkYabKJc8NOG_lp1cwffOfq"
}`
const publicJwk = `{
  "kty": "EC",
  "crv": "P-521",
  "x": "AUfN5-iTkxajWZGoNe-jzNCpSydvol5MrKf-QPS0k_3ZxgW62YdOrespAXYrK--G_ff2IoGrXWOw2kuM0JWiioOn",
  "y": "AQc6m4W2GVAfWKxf3qhCtKj6nGCQxCNTHF54AX-Yh4g271LYf8VgW8bshT877SJOJjkYabKJc8NOG_lp1cwffOfq"
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
