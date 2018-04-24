const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  log: console.log,
  UsesTranslator: require('../../Services/UsesTranslator'),
  WriteUbiquitousLanguage: require('../WriteUbiquitousLanguage')
}

//  TODO: rename object to translation
function show ({ object }) {
  this.log(object)
}

async function LogUbiquitousLanguageIntoConsole (data, injection) {
  const { log, UsesTranslator, WriteUbiquitousLanguage } = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name'
  })

  const { pattern, translator: translatorName } = data

  const translator = UsesTranslator({ translatorName })

  const translation = await WriteUbiquitousLanguage({ pattern, translator })

  translation.forEach(show, { log })
}

module.exports = LogUbiquitousLanguageIntoConsole
