const NormalizeName = require('../../Services/NormalizeName')

function isKnownAttribute ({ type }) {
  const name = NormalizeName(type)

  return this.language.has(name)
}

function fromAttributeToobject ({ type }) {
  const name = NormalizeName(type)

  return this.language.get(name).object
}

function countDependencies (acc, object) {
  const { language, objects } = acc

  const dependencies = dependenciesOf({ language }, object.name)

  return {
    ...acc,
    objects: [ ...objects, ...dependencies, object ]
  }
}

function dependenciesOf ({ language, normalizeName }, objectName) {
  const normalizedName = NormalizeName(objectName)

  const token = language.get(normalizedName)

  if (token.dependencies) return token.dependencies

  const { objects } = token.object.attributes
    .filter(isKnownAttribute, { language })
    .map(fromAttributeToobject, { language })
    .reduce(countDependencies, { objects: [], language })

  token.dependencies = objects

  return token.dependencies
}

module.exports = dependenciesOf
