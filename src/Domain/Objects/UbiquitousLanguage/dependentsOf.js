const NormalizeName = require('../../Services/NormalizeName')

function hasAttribute ({ type }) {
  return NormalizeName(type) === this.name
}

function whoReferences ([ , { attributes } ]) {
  const { token: { name } } = this

  const normalizedName = NormalizeName(name)

  return attributes.some(hasAttribute, {
    name: normalizedName
  })
}

function countDependents (acc, [ , token ]) {
  const { language, tokens } = acc

  const dependents = dependentsOf({ language }, token.name)

  return {
    ...acc,
    tokens: [ ...tokens, ...dependents, token ]
  }
}

function dependentsOf ({ language }, objectName) {
  const normalizedName = NormalizeName(objectName)

  const token = language.get(normalizedName)

  if (token.dependents) return token.dependents

  const { tokens } = Array.from(language)
    .filter(whoReferences, { token })
    .reduce(countDependents, { tokens: [], language })

  token.dependents = tokens

  return token.dependents
}

module.exports = dependentsOf
