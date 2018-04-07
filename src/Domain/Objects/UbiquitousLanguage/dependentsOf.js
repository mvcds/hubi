function hasAttribute ({ type }) {
  return this.normalizeName(type) === this.name
}

function whoReferences ([ , { entity } ]) {
  const { normalizeName, term: { entity: { name } } } = this

  return entity.attributes
    .some(hasAttribute, {
      name: normalizeName(name),
      normalizeName
    })
}

function countDependents (acc, [ _, { entity } ]) {
  const { language, entities, normalizeName } = acc

  const dependents = dependentsOf({ language, normalizeName }, entity.name)

  return {
    ...acc,
    entities: [ ...entities, ...dependents, entity ]
  }
}

function dependentsOf ({ language, normalizeName }, entityName) {
  const term = language.get(normalizeName(entityName))

  if (term.dependents) return term.dependents

  const { entities } = Array.from(language)
    .filter(whoReferences, { term, language, normalizeName })
    .reduce(countDependents, { entities: [], language, normalizeName })

  term.dependents = entities

  return term.dependents
}

module.exports = dependentsOf
