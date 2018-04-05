const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  AttributeParser: require('../../Objects/AttributeParser')
}

function DomainFile (data, injection) {
  RequiresAttribute(data, {
    name: 'name',
    description: 'description',
    attributes: 'attributes'
  })

  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  this.name = data.name
  this.description = data.description
  this.attributes = data.attributes.map(AttributeParser)

  return this
}

module.exports = DomainFile
