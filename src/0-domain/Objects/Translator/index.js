const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

const Translation = require('../Translation')

function useTheSameTranslation ({ translation }) {
  return translation
}

//  TODO: add the type as extension?
function useDefaulttName ({ name }) {
  return `${name}.hubi.js`
}

async function translate ({ ubiquitousLanguage }) {
  const translation = ubiquitousLanguage.translateEachToken({ interpretToken: this.interpretToken })

  const lexicon = await this.createLexicon({ translation })

  log('Translating')

  //  TODO: add language type?
  return new Translation({ lexicon })
}

function Translator (data) {
  RequiresAttribute(data, {
    interpretToken: 'interpret token function'
  })

  const { interpretToken, createLexicon, nameFile } = data

  this.interpretToken = interpretToken
  this.createLexicon = createLexicon || useTheSameTranslation
  this.nameFile = nameFile || useDefaulttName

  this.translate = translate.bind(this)
}

module.exports = Translator
