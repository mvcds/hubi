function hasAttribute ({ type }) {
  return type === this.name
}

function whoReferences ([ , { entity } ]) {
  const { entity: { name } } = this.term

  return entity.attributes
    .some(hasAttribute, { name })
}

function countDependents (acc, [ _, { entity } ]) {
  const { language, entities } = acc

  const dependents = dependentsOf({ language }, entity.name)

  return {
    ...acc,
    entities: [ ...entities, ...dependents, entity ]
  }
}

function dependentsOf ({ language }, entityName) {
  const term = language.get(entityName)

  if (term.dependents) return term.dependents

  const { entities } = Array.from(language)
    .filter(whoReferences, { term, language })
    .reduce(countDependents, { entities: [], language })

  term.dependents = entities

  return term.dependents
}

module.exports = dependentsOf
