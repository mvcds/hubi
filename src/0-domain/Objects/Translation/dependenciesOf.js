const NormalizeName = require('../../Services/NormalizeName')

function isKnownAttribute (token) {
  return this.lexicon.has(token.type)
}

function fromAttributeToObjec ({ type }) {
  return this.lexicon.get(type)
}

function countDependencies (acc, { token }) {
  const { lexicon, tokens } = acc

  const dependencies = dependenciesOf({ lexicon }, token.name)

  return {
    ...acc,
    tokens: [ ...tokens, ...dependencies, token ]
  }
}

function dependenciesOf ({ lexicon }, objectName) {
  const normalizedName = NormalizeName(objectName)

  const { token } = lexicon.get(normalizedName)

  if (token.dependencies) return token.dependencies

  const { tokens } = token.myTokens
    .filter(isKnownAttribute, { lexicon })
    .map(fromAttributeToObjec, { lexicon })
    .reduce(countDependencies, { tokens: [], lexicon })

  token.dependencies = tokens

  return token.dependencies
}

module.exports = dependenciesOf
