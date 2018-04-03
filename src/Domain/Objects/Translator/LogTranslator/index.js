const Translator = require('../')
const UbiTranslator = require('../UbiTranslator')

function addAttribute (schema, attribute) {
  return [
    ...schema,
    UbiTranslator.parse(attribute)
  ]
}

function transform (entity) {
  const attributes = entity.attributes
    .reduce(addAttribute, [])

  return {
    [ entity.name ]: {
      description: entity.description,
      attributes
    }
  }
}

function LogTranslator ({ entities }) {
  Object.assign(this, new Translator({ entities, transform }))
}

module.exports = LogTranslator
