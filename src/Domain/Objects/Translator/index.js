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

function translate ({ entities, transform }, { writer, output }, { pen }) {
  const translation = entities.map(toTransformed, { transform })

  translation.forEach(write, { writer, pen, output })

  return translation
}

function Translator (data) {
  RequiresAttribute(data, {
    entities: 'entities',
    transform: 'transform function'
  })

  const { entities, transform } = data

  this.translate = translate.bind(this, { entities, transform })
}

module.exports = Translator
