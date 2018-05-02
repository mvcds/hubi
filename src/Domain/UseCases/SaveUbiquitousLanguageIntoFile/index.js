const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const TranslateFiles = require('../TranslateDomainFilesToUbiquitousLanguage')

const DEPENDENCIES = {
  write: require('write')
}

function save ({ token, translated }) {
  const file = this.translator.nameFile(token)

  const filePath = `${process.env.PWD}/${this.output}/${file}`

  this.write(filePath, translated)
}

async function SaveUbiquitousLanguageIntoFile (data, injection) {
  const { write } = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name',
    output: 'output'
  })

  const { output } = data

  const translator = UsesTranslator({ translatorName: data.translator })

  const translation = await TranslateFiles({ ...data, translator })

  translation.forEachLexiconItem(save, { translator, output, write })
}

module.exports = SaveUbiquitousLanguageIntoFile
