const RequiresAttribute = require('../../../Services/RequiresAttribute')

const DEPENDENCIES = {
  write: require('write')
}

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

function transform (entity) {
  const schema = entity.attributes
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function translate (injection) {
  const { write } = Object.assign({}, DEPENDENCIES, injection)

  const result = transform(this.entity)

  write(`${this.source}/${this.entity.name}.ubi.js`, result)
}

function UbiTranslator ({
  entity = RequiresAttribute('entity'),
  source = RequiresAttribute('source')
}) {
  this.entity = entity
  this.source = source

  this.translate = translate.bind(this)
}

UbiTranslator.parse = function (attribute) {
  const { isRequired, type, name, of: arrayOf } = attribute

  const wrapped = arrayOf ? `[${arrayOf}]` : type

  const attr = `${wrapped}${isRequired ? '.required' : ''}`

  return { [name]: attr }
}

module.exports = UbiTranslator
