const DEPENDENCIES = {
  attributes: [
    require('./Attributes/StringAttribute'),
    require('./Attributes/BooleanAttribute'),
    require('./Attributes/IntegerAttribute'),
    require('./Attributes/DateAttribute'),
    require('./Attributes/FloatAttribute'),
    require('./Attributes/ObjectAttribute'),
    require('./Attributes/JSONAttribute'),
    require('./Attributes/ArrayAttribute'),
    require('./Attributes/FunctionAttribute')
  ],
  defaultAttribute: require('./Attributes/TokenAttribute')
}

function isMatch (parser) {
  return parser.isMatch(this.type)
}

function findAttribute ({ type }, injection) {
  const { attributes, defaultAttribute } = Object.assign({}, DEPENDENCIES, injection)

  const attribute = attributes.find(isMatch, { type })

  return attribute || defaultAttribute
}

module.exports = findAttribute
