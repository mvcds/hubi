const RequiresAttribute = require('../RequiresAttribute')

const ubi = require('../../Objects/Translator/UbiTranslator')
const log = require('../../Objects/Translator/LogTranslator')

const TRANSLATORS = {
  ubi,
  log
}

function UsesTranslator (data) {
  RequiresAttribute(data, {
    translatorName: 'translator name',
    ubiquitousLanguage: 'ubiquitous language'
  })

  const Translator = TRANSLATORS[data.translatorName]

  const entities = data.ubiquitousLanguage.getEntitites()

  return new Translator({ entities })
}

module.exports = UsesTranslator
