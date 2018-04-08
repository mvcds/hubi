const UbiquitousToken = require('./UbiquitousToken')

function hasAttribute ({ type }) {
  return UbiquitousToken.normalizeName(type) === this.name
}

function whoReferences ([ , { entity } ]) {
  const { token: { entity: { name } } } = this

  const normalizedName = UbiquitousToken.normalizeName(name)

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
  const normalizedName = UbiquitousToken.normalizeName(entityName)

  const token = language.get(normalizedName)

  if (token.dependents) return token.dependents

  const { entities } = Array.from(language)
    .filter(whoReferences, { token, language })
    .reduce(countDependents, { entities: [], language })

  token.dependents = entities

  return token.dependents
}

module.exports = dependentsOf
