const NormalizeName = require('../../Services/NormalizeName')

function isKnownAttribute ({ type }) {
  const name = NormalizeName(type)

  return this.language.has(name)
}

function fromAttributeToobject ({ type }) {
  const name = NormalizeName(type)

  return this.language.get(name)
}

function countDependencies (acc, token) {
  const { language, tokens } = acc

  const dependencies = dependenciesOf({ language }, token.name)

  return {
    ...acc,
    tokens: [ ...tokens, ...dependencies, token ]
  }
}

function dependenciesOf ({ language, normalizeName }, objectName) {
  const normalizedName = NormalizeName(objectName)

  const token = language.get(normalizedName)

  if (token.dependencies) return token.dependencies

  const { tokens } = token.attributes
    .filter(isKnownAttribute, { language })
    .map(fromAttributeToobject, { language })
    .reduce(countDependencies, { tokens: [], language })

  token.dependencies = tokens

  return token.dependencies
}

module.exports = dependenciesOf
