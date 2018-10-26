'use strict'

module.exports = registry => {
  return function () {
    this.seq().obj(
      this.key('n').int(),
      this.key('e').int()
    )
  }
}
