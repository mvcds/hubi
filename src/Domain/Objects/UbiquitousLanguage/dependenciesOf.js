function isKnownAttribute ({ type }) {
  const name = this.normalizeName(type)

  return this.language.has(name)
}

function fromAttributeToEntity ({ type }) {
  const name = this.normalizeName(type)

  return this.language.get(name).entity
}

function countDependencies (acc, entity) {
  const { language, entities, normalizeName } = acc

  const dependencies = dependenciesOf({ language, normalizeName }, entity.name)

  return {
    ...acc,
    entities: [ ...entities, ...dependencies, entity ]
  }
}

function dependenciesOf ({ language, normalizeName }, entityName) {
  const token = language.get(normalizeName(entityName))

  if (token.dependencies) return token.dependencies

  const { entities } = token.entity.attributes
    .filter(isKnownAttribute, { language, normalizeName })
    .map(fromAttributeToEntity, { language, normalizeName })
    .reduce(countDependencies, { entities: [], language, normalizeName })

  token.dependencies = entities

  return token.dependencies
}

module.exports = dependenciesOf
