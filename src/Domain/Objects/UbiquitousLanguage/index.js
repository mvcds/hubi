const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')
const UbiquitousToken = require('./UbiquitousToken')

function addToken (language, entity) {
  const token = new UbiquitousToken({ entity })

  return language.set(token.name, token)
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

  const language = data.entities
    .reduce(addToken, new Map())

  const privateData = { language, normalizeName: UbiquitousToken.normalizeName }

  this.dependenciesOf = dependenciesOf.bind(this, privateData)
  this.dependentsOf = dependentsOf.bind(this, privateData)
  this.getEntities = getEntities.bind(null, privateData)
}

module.exports = UbiquitousLanguage
