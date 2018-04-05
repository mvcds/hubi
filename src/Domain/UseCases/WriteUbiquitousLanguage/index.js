const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  pen: require('write')
}

async function WriteUbiquitousLanguage ({
  pattern: globPattern = RequiresAttribute('pattern'),
  translator: translatorName = RequiresAttribute('translator'),
  output
}, injection) {
  const { pen, ...injected } = Object.assign({}, DEPENDENCIES, injection)
  const { writer } = this

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)
  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  return translator.translate({ writer, output }, { pen })
}

module.exports = WriteUbiquitousLanguage
