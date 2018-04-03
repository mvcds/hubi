const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

function log (entity) {
  const value = JSON.stringify(entity, null, 2)

  console.log(value)
}

async function LogUbiquitousLanguageFile ({
  pattern: globPattern = RequiresAttribute('pattern'),
  translator: translatorName = RequiresAttribute('translator')
}) {
  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern })
  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  translator.translate().map(log)
}

module.exports = LogUbiquitousLanguageFile
