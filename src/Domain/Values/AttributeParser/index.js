const DEPENDENCIES = {
  attributes: [
    require('./StringAttribute'),
    require('./BooleanAttribute'),
    require('./IntegerAttribute'),
    require('./DateAttribute'),
    require('./FloatAttribute'),
    require('./ObjectAttribute'),
    require('./JSONAttribute')
  ]
}

function isMatch (parser) {
  return parser.isMatch(this.type)
}

function AttributeParser (attribute, injection) {
  if (typeof attribute === 'string') {
    const typedAttribute = { name: attribute }

    return AttributeParser(typedAttribute, injection)
  }

  const { attributes } = Object.assign({}, DEPENDENCIES, injection)
  const { type } = attribute

  const Attribute = attributes.find(isMatch, { type })

  return new Attribute(attribute)
}

module.exports = AttributeParser
