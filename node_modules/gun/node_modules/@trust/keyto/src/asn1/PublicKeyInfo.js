'use strict'

module.exports = registry => {
  let AlgorithmIdentifier = registry.normalize('AlgorithmIdentifier')

  return function () {
    this.seq().obj(
      this.key('algorithm').use(AlgorithmIdentifier),
      this.key('publicKey').bitstr()
    )
  }
}