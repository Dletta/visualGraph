'use strict'

module.exports = registry => {
  return function () {
    this.seq().obj(
      this.key('ri').int(),
      this.key('di').int(),
      this.key('ti').int()
    )
  }
}
