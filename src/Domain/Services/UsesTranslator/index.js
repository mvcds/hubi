const RequiresAttribute = require('../RequiresAttribute')

const ubi = require('../../Objects/Translator/UbiTranslator')
const log = require('../../Objects/Translator/LogTranslator')
const site = require('../../Objects/Translator/SiteTranslator')

const TRANSLATORS = {
  ubi,
  log,
  site
}

function UsesTranslator (data) {
  RequiresAttribute(data, {
    translatorName: 'translator name',
    ubiquitousLanguage: 'ubiquitous language'
  })

  const { translatorName, ubiquitousLanguage } = data

  const Translator = TRANSLATORS[translatorName]

  if (!Translator) throw new Error(`It is not possible to use "${translatorName}" as a translator yet`)

  const entities = ubiquitousLanguage.getEntitites()

  return new Translator({ entities })
}

module.exports = UsesTranslator
