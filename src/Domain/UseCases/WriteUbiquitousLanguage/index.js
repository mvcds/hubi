const RequiresAttribute = require('../../Services/RequiresAttribute')
const LogConditionally = require('../../Services/LogConditionally')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

//  TODO: rename it to TranslateFilesFromGlobPattern
//  TODO: move CreateUbiquitousLanguage as its step?
async function WriteUbiquitousLanguage (data, injection) {
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

module.exports = WriteUbiquitousLanguage
