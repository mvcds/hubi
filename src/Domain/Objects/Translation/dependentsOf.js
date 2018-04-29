const NormalizeName = require('../../Services/NormalizeName')

function isDependent ({ type }) {
  return type === this.name
}

function whoReferences ([ , { token } ]) {
  return token.myTokens.some(isDependent, this)
}

function countDependents (acc, [ , { token } ]) {
  const { lexicon, tokens } = acc

  const dependents = dependentsOf({ lexicon }, token.name)

  return {
    ...acc,
    tokens: [ ...tokens, ...dependents, token ]
  }
}

function dependentsOf ({ lexicon }, objectName) {
  const name = NormalizeName(objectName)

  const { token } = lexicon.get(name)

  if (token.dependents) return token.dependents

  const { tokens } = Array.from(lexicon)
    .filter(whoReferences, { name })
    .reduce(countDependents, { tokens: [], lexicon })

  token.dependents = tokens

  return token.dependents
}

module.exports = dependentsOf
