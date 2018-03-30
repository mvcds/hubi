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
    ...attribute.parse()
  }
}

function transform (entity) {
  const schema = entity.attributes
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function parse (injection) {
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

  this.parse = parse.bind(this)
}

module.exports = UbiTranslator
