const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  write: require('write')
}

async function WriteUbiquitousLanguage ({
  pattern: globPattern = RequiresAttribute('pattern'),
  translator: translatorName = RequiresAttribute('translator'),
  ...args
}, injection) {
  const { write, ...injected } = Object.assign({}, DEPENDENCIES, injection)

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)
  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  translator.translate().map(this.write, { write, ...args })
}

module.exports = WriteUbiquitousLanguage
