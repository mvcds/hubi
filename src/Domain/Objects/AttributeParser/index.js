const DEPENDENCIES = {
  attributes: [
    require('./Attributes/StringAttribute'),
    require('./Attributes/BooleanAttribute'),
    require('./Attributes/IntegerAttribute'),
    require('./Attributes/DateAttribute'),
    require('./Attributes/FloatAttribute'),
    require('./Attributes/ObjectAttribute'),
    require('./Attributes/JSONAttribute'),
    require('./Attributes/ArrayAttribute')
  ],
  defaultAttribute: require('./Attributes/Attribute')
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
