const Translator = require('../')
const UbiTranslator = require('../UbiTranslator')

function addAttribute (schema, attribute) {
  return [
    ...schema,
    UbiTranslator.parse(attribute)
  ]
}

function translateEntity (entity) {
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
  Object.assign(this, new Translator({ ...data, translateEntity }))
}

module.exports = LogTranslator
