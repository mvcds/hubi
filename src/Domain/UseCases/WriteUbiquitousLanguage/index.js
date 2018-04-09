const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  write: require('write')
}

async function WriteUbiquitousLanguage (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  const { pattern: globPattern, translator: translatorName, output } = data
  const { write, ...injected } = Object.assign({}, DEPENDENCIES, injection)
  const { target } = this

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)

  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  translator.translate({ target, output }, { write })
}

module.exports = WriteUbiquitousLanguage
