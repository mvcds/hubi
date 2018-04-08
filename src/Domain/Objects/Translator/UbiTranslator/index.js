const Translator = require('../')

function applyTemplate (schema) {
  const asString = JSON.stringify(schema, null, '  ')

  return `const SCHEMA = ${asString}

module.exports = SCHEMA
`
}

function addAttribute (schema, attribute) {
  return {
    ...schema,
    ...UbiTranslator.parse(attribute)
  }
}

function interpretEntity (entity) {
  const schema = entity.attributes
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function UbiTranslator (data) {
  Object.assign(this, new Translator({ ...data, interpretEntity }))
}

UbiTranslator.parse = function (attribute) {
  const { isRequired, type, name, of: arrayOf } = attribute

  const wrapped = arrayOf ? `[${arrayOf}]` : type

  const attr = `${wrapped}${isRequired ? '.required' : ''}`

  return { [name]: attr }
}

module.exports = UbiTranslator
