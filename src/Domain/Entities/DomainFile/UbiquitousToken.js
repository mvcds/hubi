const NormalizeName = require('../../Services/NormalizeName')

const Deprecated = require('../../Objects/Deprecated')

function UbiquitousToken ({ object }) {
  this.object = Object.assign({}, object, new Deprecated(object))

  this.name = NormalizeName(object.name)
}

module.exports = UbiquitousToken
