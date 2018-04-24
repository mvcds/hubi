const RequiresAttribute = require('../../Services/RequiresAttribute')
const LogConditionally = require('../../Services/LogConditionally')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

//  TODO: move CreateUbiquitousLanguage as its step?
async function TranslateFiles (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  const { pattern: globPattern, translator, verbose } = data

  LogConditionally({ canLog: verbose })

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injection)

  const translation = await translator.translate({ ubiquitousLanguage })

  return Array.isArray(translation) ? translation : [ translation ]
}

module.exports = TranslateFiles
