const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

const Translation = require('./Translation')

//  TODO: rename object to translation
function normalize ({ name, object }) {
  const value = typeof object === 'object' ? JSON.stringify(object, null, 2) : object

  return { name, object: value }
}

function useSameTranslation ({ translation }) {
  //  TODO: normalize after creating lexicon?
  return translation.map(normalize)
}

function useDefaulttName ({ name }) {
  return `${name}.hubi.js`
}

async function translate ({ ubiquitousLanguage }) {
  const translation = ubiquitousLanguage.withEachToken({ interpretToken: this.interpretToken })

  log(`Handling ${translation.length} translations`)

  const lexicon = await this.createLexicon({ translation })

  log('Translation handled')

  //  TODO: add language type?
  return new Translation({ lexicon })
}

function Translator (data) {
  RequiresAttribute(data, {
    interpretToken: 'interpret token function'
  })

  const { interpretToken, createLexicon, nameFile } = data

  this.interpretToken = interpretToken
  this.createLexicon = createLexicon || useSameTranslation
  this.nameFile = nameFile || useDefaulttName

  this.translate = translate.bind(this)
}

module.exports = Translator
