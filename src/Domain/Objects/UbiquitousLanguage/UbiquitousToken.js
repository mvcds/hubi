const RequiresAttribute = require('../../Services/RequiresAttribute')

function normalizeName (name) {
  return name.toLowerCase().split(' ').join('-')
}

function UbiquitousToken (data) {
  RequiresAttribute(data, {
    entity: 'entity'
  })

  const { entity } = data

  this.entity = entity

  this.name = normalizeName(entity.name)
}

UbiquitousToken.normalizeName = normalizeName

module.exports = UbiquitousToken
