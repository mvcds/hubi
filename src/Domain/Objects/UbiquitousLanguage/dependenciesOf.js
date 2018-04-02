function isKnownAttribute ({ type }) {
  return this.language.has(type)
}

function fromAttributeToEntity ({ type }) {
  return this.language.get(type).entity
}

function countDependencies (acc, entity) {
  const { language, entities } = acc

  const dependencies = dependenciesOf({ language }, entity.name)

  return {
    ...acc,
    entities: [ ...entities, ...dependencies, entity ]
  }
}

function dependenciesOf ({ language }, entityName) {
  const term = language.get(entityName)

  if (term.dependencies) return term.dependencies

  const { entities } = term.entity.attributes
    .filter(isKnownAttribute, { language })
    .map(fromAttributeToEntity, { language })
    .reduce(countDependencies, { entities: [], language })

  term.dependencies = entities

  return term.dependencies
}

module.exports = dependenciesOf
