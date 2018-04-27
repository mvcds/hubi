const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

const Translation = require('../Translation')

//  TODO: rename object to translation
function normalize ({ name, object }) {
  const value = typeof object === 'object' ? JSON.stringify(object, null, 2) : object

  return { name, object: value }
}

function useSameInterpretation ({ interpretation }) {
  return interpretation
}

//  TODO: add the type as extension?
function useDefaulttName ({ name }) {
  return `${name}.hubi.js`
}

async function translate ({ ubiquitousLanguage }) {
  const interpretation = ubiquitousLanguage.mapInterpretation({ interpretToken: this.interpretToken })

  log(`${interpretation.length} tokens insterpreted`)

  const lexicon = await this.createLexicon({ interpretation })

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
  this.createLexicon = createLexicon || useSameInterpretation
  this.nameFile = nameFile || useDefaulttName

  this.translate = translate.bind(this)
}

module.exports = Translator
