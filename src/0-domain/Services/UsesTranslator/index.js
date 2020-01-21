//  TODO: move it to objects when bumping major
const RequiresAttribute = require('../RequiresAttribute')
const LogConditionally = require('../../Services/LogConditionally')

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
    translatorName: 'translator name'
  })

  const { translatorName } = data

  const Translator = TRANSLATORS[translatorName]

  if (!Translator) throw new Error(`It is not possible to use "${translatorName}" as a translator yet`)

  LogConditionally.log(`Translator for "${translatorName}" was found`)

  return new Translator()
}

module.exports = UsesTranslator
