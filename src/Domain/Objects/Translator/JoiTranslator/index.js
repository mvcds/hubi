const Translator = require('../')

function applyTemplate (schema) {
  const asString = JSON.stringify(schema, null, '  ')

  return `const Joi = require('joi')

const SCHEMA = ${asString}

module.exports = SCHEMA
`
}

function parse (attribute) {
  const { isRequired, type, name, of: arrayOf } = attribute

  const base = `Joi.${type}()`

  const wrapped = arrayOf ? `${base}.items(Joi.${arrayOf}())` : base

  const withRequirement = isRequired ? `${wrapped}.required()` : wrapped

  return { [name]: withRequirement }
}

function addAttribute (schema, attribute) {
  return {
    ...schema,
    ...parse(attribute)
  }
}

function interpretToken (token) {
  const schema = token.attributes
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function nameFile ({ name }) {
  return `${name}.joi.js`
}

function JoiTranslator (data) {
  Object.assign(this, new Translator({ ...data, interpretToken, nameFile }))
}

module.exports = JoiTranslator
