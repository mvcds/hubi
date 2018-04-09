const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const CreateUbiquitousLanguage = require('../CreateUbiquitousLanguageFromGlobPattern')

const DEPENDENCIES = {
  write: require('write')
}

async function writeTranslation ({ name, entity }) {
  //  TODO: translator should format the name
  const filePath = `${process.env.PWD}/${this.output}/${name}.ubi.js`

  const value = typeof entity === 'object' ? JSON.stringify(entity, null, 2) : entity

  return this.target({
    entity: value.trim(),
    write: this.write,
    filePath
  })
}

async function WriteUbiquitousLanguage (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  const { pattern: globPattern, translator: translatorName, output } = data
  const { write, ...injected } = Object.assign({}, DEPENDENCIES, injection)
  const { target } = this

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, injected)

  const translator = UsesTranslator({ translatorName, ubiquitousLanguage })

  const translation = translator.translate()

  translation.forEach(writeTranslation, { target, write, output })

  return translation
}

module.exports = WriteUbiquitousLanguage
