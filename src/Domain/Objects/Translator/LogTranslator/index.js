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

function LogTranslator (data) {
  Object.assign(this, new Translator({ ...data, transform }))
}

module.exports = LogTranslator
