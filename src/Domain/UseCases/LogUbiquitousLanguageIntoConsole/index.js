const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  log: console.log,
  UsesTranslator: require('../../Services/UsesTranslator'),
  TranslateFiles: require('../TranslateDomainFilesToUbiquitousLanguage')
}

function print ({ token, translated }) {
  if (token.isAbstract && !this.translator.ignoreAbstract) return

  this.log(translated)
}

async function LogUbiquitousLanguageIntoConsole (data, injection) {
  const { log, UsesTranslator, TranslateFiles } = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name'
  })

  const translator = UsesTranslator({ translatorName: data.translator })

  const translation = await TranslateFiles({ ...data, translator })

  translation.forEachLexiconItem(print, { log })
}

module.exports = LogUbiquitousLanguageIntoConsole
