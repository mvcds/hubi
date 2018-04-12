const NormalizeName = require('../../Services/NormalizeName')

function isKnownAttribute ({ type }) {
  const name = NormalizeName(type)

  return this.language.has(name)
}

function fromAttributeToEntity ({ type }) {
  const name = NormalizeName(type)

  return this.language.get(name).entity
}

function countDependencies (acc, entity) {
  const { language, entities } = acc

  const dependencies = dependenciesOf({ language }, entity.name)

  return {
    ...acc,
    entities: [ ...entities, ...dependencies, entity ]
  }
}

function dependenciesOf ({ language, normalizeName }, entityName) {
  const normalizedName = NormalizeName(entityName)

  const token = language.get(normalizedName)

  if (token.dependencies) return token.dependencies

  const { entities } = token.entity.attributes
    .filter(isKnownAttribute, { language })
    .map(fromAttributeToEntity, { language })
    .reduce(countDependencies, { entities: [], language })

  token.dependencies = entities

  return token.dependencies
}

module.exports = dependenciesOf
