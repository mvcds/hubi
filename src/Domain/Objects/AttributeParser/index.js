const findAttribute = require('./findAttribute')

function AttributeParser (data, injection) {
  if (typeof data === 'string') {
    const typedAttribute = { name: data }

    return AttributeParser(typedAttribute, injection)
  }

  const Attribute = findAttribute({ type: data.type }, injection)

  return new Attribute(data)
}

module.exports = AttributeParser
