'use strict'

module.exports = registry => {
  let Version = registry.normalize('Version')
  let AlgorithmIdentifier = registry.normalize('AlgorithmIdentifier')

  return function () {
    this.seq().obj(
      this.key('version').use(Version),
      this.key('algorithm').use(AlgorithmIdentifier),
      this.key('privateKey').octstr()
    )
  }
}
