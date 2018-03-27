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

function parse (AttributeParser) {
  const schema = this.attributes.map(AttributeParser)
    .reduce(addAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function Entity ({ data }, injection) {
  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  this.parse = parse.bind(data, AttributeParser)

  return this
}

module.exports = Entity
