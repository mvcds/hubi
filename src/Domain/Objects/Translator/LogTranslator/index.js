const Translator = require('../')
const UbiTranslator = require('../UbiTranslator')

function addAttribute (schema, attribute) {
  return [
    ...schema,
    UbiTranslator.parse(attribute)
  ]
}

function interpretToken (token) {
  const attributes = token.attributes
    .reduce(addAttribute, [])

  return {
    [ token.name ]: {
      description: token.description,
      attributes
    }
  }
}

function LogTranslator (data) {
  Object.assign(this, new Translator({ ...data, interpretToken }))
}

module.exports = LogTranslator
