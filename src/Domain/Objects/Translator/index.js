const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

async function takeAction ({ name, object }) {
  const translatorName = this.nameFile({ name })

  const filePath = `${process.env.PWD}/${this.output}/${translatorName}`

  const value = typeof object === 'object' ? JSON.stringify(object, null, 2) : object

  return this.action({
    object: value.trim(),
    write: this.write,
    filePath
  })
}

function forEach ({ translation, action }) {
  log(`Handling ${translation.length} translations`)

  translation.forEach(action)

  log('Translation handled')
}

function useDefaulttName ({ name }) {
  return `${name}.hubi.js`
}

async function translate ({ ubiquitousLanguage }, { action, output }, { write }) {
  const translation = ubiquitousLanguage.withEachToken({ interpretToken: this.interpretToken })

  log('Translation has finished')

  await this.handleTranslation({
    translation,
    action: takeAction.bind({ action, output, write, nameFile: this.nameFile })
  })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    interpretToken: 'interpret token function'
  })

  const { interpretToken, handleTranslation, nameFile, ...rest } = data

  this.interpretToken = interpretToken
  this.handleTranslation = handleTranslation || forEach
  this.nameFile = nameFile || useDefaulttName

  this.translate = translate.bind(this, rest)
}

module.exports = Translator
