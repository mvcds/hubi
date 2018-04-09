const RequiresAttribute = require('../../Services/RequiresAttribute')

async function sendToTarget ({ name, entity }) {
  //  TODO: translator should format the name
  const filePath = `${process.env.PWD}/${this.output}/${name}.ubi.js`

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

function translate ({ ubiquitousLanguage, translateEntity, handleTranslation = forEach }, { target, output }, { write }) {
  const translation = ubiquitousLanguage.withEachEntity({ translateEntity })

  const action = sendToTarget.bind({ target, output, write })

  handleTranslation({ translation, action })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    translateEntity: 'interpret entity function'
  })

  this.translate = translate.bind(null, data)
}

module.exports = Translator
