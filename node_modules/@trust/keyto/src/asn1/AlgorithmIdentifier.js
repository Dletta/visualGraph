'use strict'

module.exports = registry => {
  return function () {
    this.seq().obj(
      this.key('algorithm').objid(),
      this.key('parameters').optional().any()
    )
  }
}
