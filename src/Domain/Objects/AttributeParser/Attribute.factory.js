const { lorem } = require('faker')

function TypelessObject ({ name = lorem.word() } = {}) {
  return { name }
}

function typedAttribute (data) {
  return {
    ...data,
    ...TypelessObject(data),
    type: this.type
  }
}

function Token (type) {
  return typedAttribute.call({ type })
}

function asArray (type) {
  return typedAttribute.call({ type: 'array' }, { of: type })
}

module.exports = {
  TypelessObject,
  String: typedAttribute.bind({ type: 'string' }),
  Bool: typedAttribute.bind({ type: 'bool' }),
  Boolean: typedAttribute.bind({ type: 'boolean' }),
  Date: typedAttribute.bind({ type: 'date' }),
  Decimal: typedAttribute.bind({ type: 'float' }),
  Float: typedAttribute.bind({ type: 'float' }),
  Number: typedAttribute.bind({ type: 'float' }),
  Int: typedAttribute.bind({ type: 'integer' }),
  Integer: typedAttribute.bind({ type: 'integer' }),
  JSON: typedAttribute.bind({ type: 'json' }),
  Object: typedAttribute.bind({ type: 'object' }),
  Shape: typedAttribute.bind({ type: 'object' }),
  Token,
  Array: asArray
}
