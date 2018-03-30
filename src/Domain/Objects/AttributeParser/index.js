const DEPENDENCIES = {
  attributes: [
    require('./StringAttribute'),
    require('./BooleanAttribute'),
    require('./IntegerAttribute'),
    require('./DateAttribute'),
    require('./FloatAttribute'),
    require('./ObjectAttribute'),
    require('./JSONAttribute'),
    require('./ArrayAttribute')
  ],
  defaultAttribute: require('./Attribute')
}

function isMatch (parser) {
  return parser.isMatch(this.type)
}

function AttributeParser (data, injection) {
  if (typeof data === 'string') {
    const typedAttribute = { name: data }

    return AttributeParser(typedAttribute, injection)
  }

  const { attributes, defaultAttribute } = Object.assign({}, DEPENDENCIES, injection)
  const { type } = data

  const attribute = attributes.find(isMatch, { type })

  const Attribute = attribute || defaultAttribute

  return new Attribute(data)
}

module.exports = AttributeParser
