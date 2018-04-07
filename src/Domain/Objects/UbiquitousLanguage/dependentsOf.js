function hasAttribute ({ type }) {
  return this.normalizeName(type) === this.name
}

function whoReferences ([ , { entity } ]) {
  const { normalizeName, token: { entity: { name } } } = this

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
  const token = language.get(normalizeName(entityName))

  if (token.dependents) return token.dependents

  const { entities } = Array.from(language)
    .filter(whoReferences, { token, language, normalizeName })
    .reduce(countDependents, { entities: [], language, normalizeName })

  token.dependents = entities

  return token.dependents
}

module.exports = dependentsOf
