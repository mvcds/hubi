const pug = require('pug')

const Translator = require('../')

function applyTemplate (schema) {
  const file = `${__dirname}/joi.pug`

  return pug.renderFile(file, { schema })
}

function parse (attribute) {
  const { isRequired, type, name, of: arrayOf, ...data } = attribute

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

  //  TODO: lint burden should be placed on end-user
  return content.replace(/"/g, "'")
}

function nameFile ({ name }) {
  return `${name}.joi.js`
}

function JoiTranslator (data) {
  Object.assign(this, new Translator({ ...data, interpretToken, nameFile }))
}

module.exports = JoiTranslator
