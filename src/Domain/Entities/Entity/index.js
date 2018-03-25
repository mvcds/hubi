function parseAttribute (schema, key) {
  return {
    ...schema,
    [key]: 'string'
  }
}

function applyTemplate (schema) {
  const asString = JSON.stringify(schema, null, '  ')

  return `const SCHEMA = ${asString}

module.exports = SCHEMA
`
}

function parse ({ attributes }) {
  const schema = attributes.reduce(parseAttribute, {})

  const content = applyTemplate(schema)

  return content.replace(/"/g, "'")
}

function Entity ({ domain }, injection) {
  this.parse = parse.bind(this, domain)

  return this
}

module.exports = Entity
