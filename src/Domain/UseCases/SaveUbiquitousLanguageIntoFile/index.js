const RequiresAttribute = require('../../Services/RequiresAttribute')
const UsesTranslator = require('../../Services/UsesTranslator')

const TranslateFiles = require('../TranslateFiles')

const DEPENDENCIES = {
  write: require('write')
}

//  TODO: rename object to translation
function save ({ name, object }) {
  const file = this.translator.nameFile({ name })

  const filePath = `${process.env.PWD}/${this.output}/${file}`

  this.write(filePath, object)
}

async function SaveUbiquitousLanguageIntoFile (data, injection) {
  const { write } = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator name',
    output: 'output'
  })

  const { pattern, translator: translatorName, output } = data

  const translator = UsesTranslator({ translatorName })

  const translation = await TranslateFiles({ pattern, translator })

  translation.forEach(save, { translator, output, write })
}

module.exports = SaveUbiquitousLanguageIntoFile
