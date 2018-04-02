const RequiresAttribute = require('../../Services/RequiresAttribute')

function addTerm (language, entity) {
  return language.set(entity.name, { entity })
}

function isKnownAttribute ({ type }) {
  return this.language.has(type)
}

function fromAttributeToEntity ({ type }) {
  return this.language.get(type).entity
}

function countDependencies (acc, entity) {
  const { language, entities } = acc

  const result = dependenciesOf({ language }, entity.name)

  return {
    ...acc,
    entities: [ ...entities, ...result, entity ]
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

function UbiquitousLanguage ({
  entities = RequiresAttribute('entities')
}) {
  const language = entities.reduce(addTerm, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language })
}

module.exports = UbiquitousLanguage
