'use strict'

module.exports = registry => {
  return function () {
    this.int({
      0: 'two-prime',
      1: 'multi'
    })
  }
}
