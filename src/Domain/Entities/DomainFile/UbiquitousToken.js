const NormalizeName = require('../../Services/NormalizeName')

const Deprecated = require('../../Objects/Deprecated')

function UbiquitousToken ({ object, filePath }) {
  this.object = object
  this.filePath = filePath

  this.name = NormalizeName(object.name)

  Object.assign(this, new Deprecated(this, object))
}

module.exports = UbiquitousToken
