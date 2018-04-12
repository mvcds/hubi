const NormalizeName = require('../../Services/NormalizeName')

function hasAttribute ({ type }) {
  return NormalizeName(type) === this.name
}

function whoReferences ([ , { object } ]) {
  const { token: { object: { name } } } = this

  const normalizedName = NormalizeName(name)

  return object.attributes
    .some(hasAttribute, {
      name: normalizedName
    })
}

function countDependents (acc, [ _, { object } ]) {
  const { language, objects } = acc

  const dependents = dependentsOf({ language }, object.name)

  return {
    ...acc,
    objects: [ ...objects, ...dependents, object ]
  }
}

function dependentsOf ({ language }, objectName) {
  const normalizedName = NormalizeName(objectName)

  const token = language.get(normalizedName)

  if (token.dependents) return token.dependents

  const { objects } = Array.from(language)
    .filter(whoReferences, { token, language })
    .reduce(countDependents, { objects: [], language })

  token.dependents = objects

  return token.dependents
}

module.exports = dependentsOf
