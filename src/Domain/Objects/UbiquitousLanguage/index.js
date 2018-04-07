const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')

function normalizeName (name) {
  return name.toLowerCase().split(' ').join('-')
}

function addTerm (language, entity) {
  const term = normalizeName(entity.name)

  return language.set(term, { entity })
}

//  TODO: do not expose the language's entitites
function getEntities ({ language }) {
  return Array.from(language)
    .map(([ , { entity } ]) => entity)
}

function UbiquitousLanguage (data) {
  RequiresAttribute(data, {
    entities: 'entities'
  })

  const language = data.entities.reduce(addTerm, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language, normalizeName })
  this.dependentsOf = dependentsOf.bind(this, { language, normalizeName })
  this.getEntities = getEntities.bind(null, { language })
}

module.exports = UbiquitousLanguage
