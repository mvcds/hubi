const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

async function sendToaction ({ name, object }) {
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

function useDefaultName ({ name }) {
  return `${name}.hubi.js`
}

async function translate (data, { action, output }, { write }) {
  const { ubiquitousLanguage, interpretToken, handleTranslation, nameFile } = Object.assign({}, {
    handleTranslation: forEach,
    nameFile: useDefaultName
  }, data)

  const translation = ubiquitousLanguage.withEachToken({ interpretToken })

  log('Translation has finished')

  await handleTranslation({
    translation,
    action: sendToaction.bind({ action, output, write, nameFile })
  })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    interpretToken: 'interpret token function'
  })

  this.translate = translate.bind(null, data)
}

module.exports = Translator
