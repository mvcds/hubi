const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

async function sendToTarget ({ name, object }) {
  const translatorName = this.nameFile({ name })

  const filePath = `${process.env.PWD}/${this.output}/${translatorName}`

  const value = typeof object === 'object' ? JSON.stringify(object, null, 2) : object

  return this.target({
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

async function translate (data, { target, output }, { write }) {
  const { ubiquitousLanguage, interpretToken, handleTranslation, nameFile } = Object.assign({}, {
    handleTranslation: forEach,
    nameFile: useDefaultName
  }, data)

  const translation = ubiquitousLanguage.withEachToken({ interpretToken })

  log('Translation has finished')

  const action = sendToTarget.bind({ target, output, write, nameFile })

  await handleTranslation({ translation, action })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    interpretToken: 'interpret token function'
  })

  this.translate = translate.bind(null, data)
}

module.exports = Translator
