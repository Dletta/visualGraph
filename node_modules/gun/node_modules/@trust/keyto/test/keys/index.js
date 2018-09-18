'use strict'

/**
 * Dependencies
 * @ignore
 */
const path = require('path')
const glob = require('glob')

/**
 * Keys
 * @ignore
 */
const getKeys = (dir) => {
  let files = glob.sync(`${dir}/*.js`)
  let descriptors = files.map(file => {
    return {
      name: path.basename(file, '.js'),
      folder: path.dirname(file)
    }
  })

  return descriptors.reduce((state, descriptor) => {
    let { name, folder } = descriptor
    state[name] = require(path.join(folder, name))
    return state
  }, {})
}

/**
 * Export
 * @ignore
 */
module.exports = glob.sync(`${__dirname}/**/`)
  .filter(dir => dir !== `${__dirname}/`)
  .reduce((state, dir) => {
    let name = path.basename(dir)
    state[name] = getKeys(dir)
    return state
  }, {})
