const NormalizeName = require('../../Services/NormalizeName')

const Deprecated = require('../../Objects/Deprecated')

function UbiquitousToken ({ object }) {
  this.object = object
  this.name = NormalizeName(object.name)

  Object.assign(this, new Deprecated(this, object))
}

module.exports = UbiquitousToken
