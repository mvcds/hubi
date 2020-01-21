const Joi = require('joi')

const SCHEMA = require('./translation.joi.js')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')

function stringify ([ name, translation ]) {
  if (typeof translation.translated === 'string') return [ name, translation ]

  const { token, translated } = translation

  const stringified = JSON.stringify(translated, null, 2)

  return [ name, { token, translated: stringified } ]
}

function isConcreate ([ , { token } ]) {
  return !token.isAbstract || this.translator.useAbstractAsConcreate
}

function forEachLexiconItem ({ lexicon }, fn, thisArgs) {
  const { translator } = thisArgs

  const temp = Array.from(lexicon)
    .filter(isConcreate, { translator })

  new Map(temp).forEach(fn, thisArgs)
}

function Translation (data) {
  Joi.assert(data, SCHEMA)

  const stringified = Array.from(data.lexicon)
    .map(stringify)

  const lexicon = new Map(stringified)

  this.dependenciesOf = dependenciesOf.bind(this, { lexicon })
  this.dependentsOf = dependentsOf.bind(this, { lexicon })

  this.forEachLexiconItem = forEachLexiconItem.bind(null, { lexicon })
}

module.exports = Translation
