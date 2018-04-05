const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')

function addTerm (language, entity) {
  return language.set(entity.name, { entity })
}

//  TODO: do not expose the language's entitites
function getEntitites ({ language }) {
  return Array.from(language)
    .map(([ , { entity } ]) => entity)
}

function UbiquitousLanguage (data) {
  RequiresAttribute(data, {
    entities: 'entities'
  })

  const language = data.entities.reduce(addTerm, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language })
  this.dependentsOf = dependentsOf.bind(this, { language })
  this.getEntitites = getEntitites.bind(null, { language })
}

module.exports = UbiquitousLanguage
