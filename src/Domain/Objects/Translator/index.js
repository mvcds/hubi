const RequiresAttribute = require('../../Services/RequiresAttribute')

async function sendToTarget ({ name, entity }) {
  const translatorName = this.nameEntity({ name })

  const filePath = `${process.env.PWD}/${this.output}/${translatorName}`

  const value = typeof entity === 'object' ? JSON.stringify(entity, null, 2) : entity

  return this.target({
    entity: value.trim(),
    write: this.write,
    filePath
  })
}

function forEach ({ translation, action }) {
  translation.forEach(action)
}

function useDefaultName ({ name }) {
  return `${name}.hubi.js`
}

async function translate (data, { target, output }, { write }) {
  const { ubiquitousLanguage, translateEntity, handleTranslation, nameEntity } = Object.assign({}, {
    handleTranslation: forEach,
    nameEntity: useDefaultName
  }, data)

  const translation = ubiquitousLanguage.withEachEntity({ translateEntity })

  const action = sendToTarget.bind({ target, output, write, nameEntity })

  await handleTranslation({ translation, action })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    translateEntity: 'interpret entity function'
  })

  this.translate = translate.bind(null, data)
}

module.exports = Translator
