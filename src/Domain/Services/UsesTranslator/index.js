const RequiresAttribute = require('../RequiresAttribute')

const ubi = require('../../Objects/Translator/UbiTranslator')
const log = require('../../Objects/Translator/LogTranslator')
const site = require('../../Objects/Translator/SiteTranslator')
const joi = require('../../Objects/Translator/JoiTranslator')

const TRANSLATORS = {
  ubi,
  log,
  site,
  joi
}

function UsesTranslator (data) {
  RequiresAttribute(data, {
    translatorName: 'translator name',
    ubiquitousLanguage: 'ubiquitous language'
  })

  const { translatorName, ubiquitousLanguage } = data

  const Translator = TRANSLATORS[translatorName]

  if (!Translator) throw new Error(`It is not possible to use "${translatorName}" as a translator yet`)

  return new Translator({ ubiquitousLanguage })
}

module.exports = UsesTranslator
