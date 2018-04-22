const NormalizeName = require('../../Services/NormalizeName')
const RequiresAttribute = require('../../Services/RequiresAttribute')

const Deprecated = require('../../Objects/Deprecated')

const DEPENDENCIES = {
  AttributeParser: require('../../Objects/AttributeParser')
}

function UbiquitousToken (data, injection) {
  RequiresAttribute(data, {
    name: 'name',
    description: 'description',
    attributes: 'attributes',
    filePath: 'file to path'
  })

  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  const attributes = data.attributes.map(AttributeParser)

  Object.assign(this, data, { attributes }, new Deprecated(data))
  this.filePath = data.filePath
  this.name = NormalizeName(data.name)
  this.rawName = data.name
}

module.exports = UbiquitousToken
