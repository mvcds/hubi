const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  AttributeParser: require('../../Values/AttributeParser')
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

function parse () {
  const schema = this.attributes
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function Entity ({
  name = RequiresAttribute('name'),
  description = RequiresAttribute('description'),
  attributes = RequiresAttribute('attributes')
}, injection) {
  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  this.name = name
  this.description = description
  this.attributes = attributes.map(AttributeParser)

  this.parse = parse.bind(this)

  return this
}

module.exports = Entity
