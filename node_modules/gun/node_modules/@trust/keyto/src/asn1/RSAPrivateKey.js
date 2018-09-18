'use strict'

module.exports = registry => {
  let Version = registry.normalize('Version')
  let OtherPrimeInfos = registry.normalize('OtherPrimeInfos')

  return function () {
    this.seq().obj(
      this.key('version').use(Version),
      this.key('n').int(),
      this.key('e').int(),
      this.key('d').int(),
      this.key('p').int(),
      this.key('q').int(),
      this.key('dp').int(),
      this.key('dq').int(),
      this.key('qi').int(),
      this.key('other').optional().use(OtherPrimeInfos)
    )
  }
}
