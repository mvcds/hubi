const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  write: console.log
}

function addAttribute (schema, attribute) {
  return [
    ...schema,
    attribute.parse()
  ]
}

function transform (entity) {
  const attributes = entity.attributes
    .reduce(addAttribute, [])

  const asString = JSON.stringify({
    [ entity.name ]: { attributes }
  }, null, 2)

  return asString
}

function parse (injection) {
  const { write } = Object.assign({}, DEPENDENCIES, injection)

  const result = transform(this.entity)

  write(result)
}

function LogParser ({
  entity = RequiresAttribute('entity')
}) {
  this.entity = entity

  this.parse = parse.bind(this)
}

module.exports = LogParser
