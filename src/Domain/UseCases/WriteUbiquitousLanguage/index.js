const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  pen: require('write')
}

async function write ({ name, entity }) {
  //  TODO: translator should format the name
  const filePath = `${process.env.PWD}/${this.output}/${name}.ubi.js`

  const value = typeof entity === 'object' ? JSON.stringify(entity, null, 2) : entity

  return this.writer({
    entity: value.trim(),
    pen: this.pen,
    filePath
  })
}

async function WriteUbiquitousLanguage (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  const { pattern: globPattern, translator: translatorName, output } = data
  const { pen, ...injected } = Object.assign({}, DEPENDENCIES, injection)
  const { writer } = this

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)
  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  const translation = translator.translate()

  translation.forEach(write, { writer, pen, output })

  return translation
}

module.exports = WriteUbiquitousLanguage
