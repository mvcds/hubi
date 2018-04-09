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

function translate ({ ubiquitousLanguage, translateEntity }, { target, output }, { write }) {
  const translation = ubiquitousLanguage.withEachEntity({ translateEntity })

  translation.forEach(sendToTarget, { target, output, write })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    translateEntity: 'interpret entity function'
  })

  const { ubiquitousLanguage, translateEntity } = data

  this.translate = translate.bind(null, { ubiquitousLanguage, translateEntity })
}

module.exports = Translator
