const path = require('path')

const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const TranslateFiles = require('../TranslateDomainFilesToUbiquitousLanguage')

const DEPENDENCIES = {
  write: require('write')
}

function save ({ token, translated }) {
  if (token.isAbstract && !this.translator.ignoreAbstract) return

  const file = this.translator.nameFile(token)

  const base = this.sameFolder ? path.dirname(token.filePath) : `${process.env.PWD}/${this.output}`

  const filePath = `${base}/${file}`

  this.write(filePath, translated)
}

async function SaveUbiquitousLanguageIntoFile (data, injection) {
  const { write } = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name'
  })

  const { output, sameFolder } = data

  const translator = UsesTranslator({ translatorName: data.translator })

  if (sameFolder && translator.ignoreSameFolder) throw new Error(`"${data.translator}" does not generate on same folder`)

  const translation = await TranslateFiles({ ...data, translator })

  translation.forEachLexiconItem(save, { translator, output, write, sameFolder })
}

module.exports = SaveUbiquitousLanguageIntoFile
