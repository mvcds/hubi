const RequiresAttribute = require('../../Services/RequiresAttribute')

function toTransformed (entity) {
  return {
    name: entity.name.toLowerCase().split(' ').join('-'),
    entity: this.transform(entity)
  }
}

async function write ({ name, entity }) {
  const filePath = `${process.env.PWD}/${this.output}/${name}.ubi.js`

  const value = typeof entity === 'object' ? JSON.stringify(entity, null, 2) : entity

  return this.writer({
    entity: value.trim(),
    pen: this.pen,
    filePath
  })
}

function translate ({ ubiquitousLanguage, transform }, { writer, output }, { pen }) {
  const translation = ubiquitousLanguage.getTokens().map(toTransformed, { transform })

  translation.forEach(write, { writer, pen, output })

  return translation
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    transform: 'transform function'
  })

  const { ubiquitousLanguage, transform } = data

  this.translate = translate.bind(this, { ubiquitousLanguage, transform })
}

module.exports = Translator
