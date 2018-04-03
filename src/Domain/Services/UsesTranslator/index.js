const RequiresAttribute = require('../RequiresAttribute')

const ubi = require('../../Objects/Translator/UbiTranslator')
const log = require('../../Objects/Translator/LogTranslator')

const TRANSLATORS = {
  ubi,
  log
}

function UsesTranslator ({
  translatorName = RequiresAttribute('translator name'),
  ubiquitousLanguage = RequiresAttribute('ubiquitous language')
}) {
  const Translator = TRANSLATORS[translatorName]

  const entities = ubiquitousLanguage.getEntitites()

  return new Translator({ entities })
}

module.exports = UsesTranslator
