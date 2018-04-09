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

function translate ({ ubiquitousLanguage, interpretEntity }, { target, output }, { write }) {
  const translation = ubiquitousLanguage.interpret({ interpretEntity })

  translation.forEach(sendToTarget, { target, output, write })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    interpretEntity: 'interpret entity function'
  })

  const { ubiquitousLanguage, interpretEntity } = data

  this.translate = translate.bind(null, { ubiquitousLanguage, interpretEntity })
}

module.exports = Translator
