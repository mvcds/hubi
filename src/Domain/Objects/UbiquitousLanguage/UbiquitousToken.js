const RequiresAttribute = require('../../Services/RequiresAttribute')
const NormalizeName = require('../../Services/NormalizeName')

function UbiquitousToken (data) {
  RequiresAttribute(data, {
    entity: 'entity'
  })

  const { entity } = data

  this.entity = entity

  this.name = NormalizeName(entity.name)
}

module.exports = UbiquitousToken
