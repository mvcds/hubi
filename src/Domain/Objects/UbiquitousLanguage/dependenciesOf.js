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
  const term = language.get(normalizeName(entityName))

  if (term.dependencies) return term.dependencies

  const { entities } = term.entity.attributes
    .filter(isKnownAttribute, { language, normalizeName })
    .map(fromAttributeToEntity, { language, normalizeName })
    .reduce(countDependencies, { entities: [], language, normalizeName })

  term.dependencies = entities

  return term.dependencies
}

module.exports = dependenciesOf
