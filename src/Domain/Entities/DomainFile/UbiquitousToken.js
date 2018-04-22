const NormalizeName = require('../../Services/NormalizeName')

const Deprecated = require('../../Objects/Deprecated')

function UbiquitousToken ({ object, filePath }) {
  this.object = Object.assign({}, object, new Deprecated(object))
  this.filePath = filePath

  this.name = NormalizeName(object.name)
}

module.exports = UbiquitousToken
