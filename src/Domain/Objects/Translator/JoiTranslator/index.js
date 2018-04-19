const pug = require('pug')

const Translator = require('../')

const Attribute = require('./Attribute')

function applyTemplate (schema) {
  const file = `${__dirname}/joi.pug`

  return pug.renderFile(file, { schema })
}

function parse ({ name, ...data }) {
  const attribute = new Attribute(data)

  const joi = attribute.parse()

  return { [name]: joi }
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
