const pug = require('pug')

const Translator = require('../')

function applyTemplate (schema) {
  const file = `${__dirname}/ubi.pug`
  const asString = JSON.stringify(schema, null, '  ')

  return pug.renderFile(file, { schema: asString })
}

function addAttribute (schema, attribute) {
  return {
    ...schema,
    ...UbiTranslator.parse(attribute)
  }
}

function interpretToken (token) {
  const schema = token.attributes
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  //  TODO: lint burden should be placed on end-user
  return content.replace(/"/g, "'")
}

function UbiTranslator (data) {
  Object.assign(this, new Translator({ ...data, interpretToken }))
}

UbiTranslator.parse = function (attribute) {
  const { isRequired, type, name, of: arrayOf } = attribute

  const wrapped = arrayOf ? `[${arrayOf}]` : type

  const attr = `${wrapped}${isRequired ? '.required' : ''}`

  return { [name]: attr }
}

module.exports = UbiTranslator
