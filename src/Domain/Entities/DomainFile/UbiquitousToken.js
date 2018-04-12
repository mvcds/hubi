const NormalizeName = require('../../Services/NormalizeName')

function UbiquitousToken ({ object }) {
  this.object = object
  this.name = NormalizeName(object.name)
}

module.exports = UbiquitousToken
