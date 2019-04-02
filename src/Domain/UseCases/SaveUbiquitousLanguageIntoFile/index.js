const path = require('path')

const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const TranslateFiles = require('../TranslateDomainFilesToUbiquitousLanguage')

const DEPENDENCIES = {
  write: require('write')
}

function save ({ token, translated }) {
  const file = this.translator.nameFile(token)

  const base = this.sameFolder ? path.dirname(token.filePath) : `${process.env.PWD}/${this.output}`

  const filePath = `${base}/${file}`

  this.write(filePath, translated)
}

async function SaveUbiquitousLanguageIntoFile (data, injection) {
  const resolved = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name'
  })

  await translate(data, resolved)
}

async function translate (data, { write }) {
  const { output, sameFolder } = data

  const translator = UsesTranslator({ translatorName: data.translator })

  const translation = await TranslateFiles({ ...data, translator })

  translation.forEachLexiconItem(save, { translator, output, write, sameFolder })
}

module.exports = SaveUbiquitousLanguageIntoFile
