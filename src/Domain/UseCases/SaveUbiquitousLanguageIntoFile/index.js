const path = require('path')

const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')
const LogConditionally = require('../../Services/LogConditionally')

const TranslateFiles = require('../TranslateDomainFilesToUbiquitousLanguage')

const watchForChanges = require('./watchForChanges')

const DEPENDENCIES = {
  write: require('write'),
  gw: require('glob-watcher')
}

function save ({ token, translated }) {
  const file = this.translator.nameFile(token)

  const base = this.sameFolder ? path.dirname(token.filePath) : `${process.env.PWD}/${this.output}`

  const filePath = `${base}/${file}`

  this.write(filePath, translated)
}

async function SaveUbiquitousLanguageIntoFile (data, injection) {
  const { gw, ...resolved } = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name'
  })

  const { watch, verbose, ...rest } = data

  LogConditionally({ canLog: verbose })

  const translate = createTranslation(rest, resolved)

  await translate()

  if (watch) {
    watchForChanges(data, translate, gw)
  }
}

function createTranslation (data, { write }) {
  const { output, sameFolder } = data

  const translator = UsesTranslator({ translatorName: data.translator })

  return async () => {
    LogConditionally.env('Started translating', 'PRODUCTION')

    const translation = await TranslateFiles({ ...data, translator })

    translation.forEachLexiconItem(save, { translator, output, write, sameFolder })

    LogConditionally.env('Finished translating', 'PRODUCTION')
  }
}

module.exports = SaveUbiquitousLanguageIntoFile
