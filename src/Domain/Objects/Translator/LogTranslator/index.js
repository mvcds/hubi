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

  return JSON.stringify({
    [ entity.name ]: {
      description: entity.description,
      attributes
    }
  }, null, 2)
}

function LogTranslator ({ entities }) {
  Object.assign(this, new Translator({ entities, transform }))
}

module.exports = LogTranslator
