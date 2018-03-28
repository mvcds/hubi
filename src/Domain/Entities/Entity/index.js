const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  AttributeParser: require('../../Values/AttributeParser')
}

function Entity ({
  name = RequiresAttribute('name'),
  description = RequiresAttribute('description'),
  attributes = RequiresAttribute('attributes')
}, injection) {
  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  this.name = name
  this.description = description
  this.attributes = attributes.map(AttributeParser)

  return this
}

module.exports = Entity
