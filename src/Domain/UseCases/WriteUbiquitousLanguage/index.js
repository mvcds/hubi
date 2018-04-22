const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')
const LogConditionally = require('../../Services/LogConditionally')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  write: require('write')
}

async function WriteUbiquitousLanguage (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  const { pattern: globPattern, translator: translatorName, output, verbose } = data
  const { write, ...injected } = Object.assign({}, DEPENDENCIES, injection)
  const { action } = this

  LogConditionally({ canLog: verbose })

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)

  LogConditionally.log('Hubi knows your ubiquitous language')

  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  LogConditionally.log(`Translator for "${translatorName}" was found`)

  await translator.translate({ action, output }, { write })
}

module.exports = WriteUbiquitousLanguage
