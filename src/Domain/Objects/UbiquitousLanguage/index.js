const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')

function addTerm (language, entity) {
  return language.set(entity.name, { entity })
}

function UbiquitousLanguage ({
  entities = RequiresAttribute('entities')
}) {
  const language = entities.reduce(addTerm, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language })
  this.dependentsOf = dependentsOf.bind(this, { language })
}

module.exports = UbiquitousLanguage
