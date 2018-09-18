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
const RSA = require(path.join(cwd, 'src', 'types', 'RSA'))

/**
 * Test Consts
 * @ignore
 */
const { RSA: { RS256 } } = require(path.join(cwd, 'test', 'keys'))

/**
 * Tests
 */
describe('RSA Key Type', () => {

})
