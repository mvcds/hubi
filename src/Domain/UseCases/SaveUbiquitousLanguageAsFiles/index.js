const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  write: require('write')
}

function save (entity, index) {
  //  TODO: language gives the filePath
  const filePath = `${process.env.PWD}/${this.output}/${index}.ubi.js`

  //  TODO: this decision does not belong here
  const value = typeof entity === 'string' ? entity : JSON.stringify(entity, null, 2)

  this.write(filePath, value)
}

async function SaveUbiquitousLanguageAsFiles ({
  pattern: globPattern = RequiresAttribute('pattern'),
  output = RequiresAttribute('output'),
  translator: translatorName = RequiresAttribute('translator')
}, injection) {
  const { write, ...injected } = Object.assign({}, DEPENDENCIES, injection)

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)
  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  translator.translate().map(save, { write, output })
}

module.exports = SaveUbiquitousLanguageAsFiles
