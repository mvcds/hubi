const { lorem, random } = require('faker')

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

function DeprecatedWithText (deprecated) {
  const type = random.objectElement(PRIMITIVES)

  return type({ deprecated })
}

function DeprecatedWithBoolean (name) {
  const type = random.objectElement(PRIMITIVES)

  return type({ name, deprecated: true })
}

function DeprecatedWithError (name) {
  const type = random.objectElement(PRIMITIVES)

  return type({ name, deprecated: { error: true } })
}

const PRIMITIVES = {
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
  Shape: typedAttribute.bind({ type: 'object' })
}

module.exports = {
  ...PRIMITIVES,
  Token,
  Array: asArray,
  DeprecatedWithText,
  DeprecatedWithBoolean,
  DeprecatedWithError
}
