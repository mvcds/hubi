const RequiresAttribute = require('../../../Services/RequiresAttribute')

const UbiTranslator = require('../UbiTranslator')

const DEPENDENCIES = {
  write: console.log
}

function addAttribute (schema, attribute) {
  return [
    ...schema,
    UbiTranslator.parse(attribute)
  ]
}

function transform (entity) {
  const attributes = entity.attributes
    .reduce(addAttribute, [])

  const transformed = {
    [ entity.name ]: {
      description: entity.description,
      attributes
    }
  }

  const asString = JSON.stringify(transformed, null, 2)

  return asString
}

function translate (injection) {
  const { write } = Object.assign({}, DEPENDENCIES, injection)

  const result = transform(this.entity)

  write(result)
}

function LogTranslator ({
  entity = RequiresAttribute('entity')
}) {
  this.entity = entity

  this.translate = translate.bind(this)
}

module.exports = LogTranslator
