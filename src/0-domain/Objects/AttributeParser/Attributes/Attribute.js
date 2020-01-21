const Joi = require('joi')

const SCHEMA = require('./attribute.joi.js')

const Deprecated = require('../../Deprecated')

const KEYS = Object.keys(SCHEMA)
const NIL = {
  schema: {},
  rest: {}
}

function allowUnkownKeys (nil, [ key, value ]) {
  const override = KEYS.includes(key) ? 'schema' : 'rest'

  return {
    ...nil,
    [override]: { ...nil[override], [key]: value }
  }
}

function Attribute (data) {
  const { schema, rest } = Object.entries(data)
    .reduce(allowUnkownKeys, NIL)

  Object.assign(this, rest, Joi.attempt(schema, SCHEMA), new Deprecated(data))

  //  TODO: allow to rename before using attempt
  this.isRequired = this.required
  delete this.required
}

Attribute.includes = function includes (...types) {
  return (type) => types.includes(type)
}

module.exports = Attribute
