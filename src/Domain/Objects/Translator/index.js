const RequiresAttribute = require('../../Services/RequiresAttribute')

async function write ({ name, entity }) {
  const filePath = `${process.env.PWD}/${this.output}/${name}.ubi.js`

  const value = typeof entity === 'object' ? JSON.stringify(entity, null, 2) : entity

  return this.writer({
    entity: value.trim(),
    pen: this.pen,
    filePath
  })
}

function translate ({ ubiquitousLanguage, interpretEntity }, { writer, output }, { pen }) {
  const translation = ubiquitousLanguage.interpret({ interpretEntity })

  translation.forEach(write, { writer, pen, output })

  return translation
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    interpretEntity: 'interpret entity function'
  })

  const { ubiquitousLanguage, interpretEntity } = data

  this.translate = translate.bind(this, { ubiquitousLanguage, interpretEntity })
}

module.exports = Translator
