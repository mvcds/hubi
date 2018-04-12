const NormalizeName = require('../../Services/NormalizeName')

function hasAttribute ({ type }) {
  return NormalizeName(type) === this.name
}

function whoReferences ([ , { entity } ]) {
  const { token: { entity: { name } } } = this

  const normalizedName = NormalizeName(name)

  return entity.attributes
    .some(hasAttribute, {
      name: normalizedName
    })
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
  const normalizedName = NormalizeName(entityName)

  const token = language.get(normalizedName)

  if (token.dependents) return token.dependents

  const { entities } = Array.from(language)
    .filter(whoReferences, { token, language })
    .reduce(countDependents, { entities: [], language })

  token.dependents = entities

  return token.dependents
}

module.exports = dependentsOf
