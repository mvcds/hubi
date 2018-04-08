const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')
const UbiquitousToken = require('./UbiquitousToken')

function addToken (language, entity) {
  const token = new UbiquitousToken({ entity })

  return language.set(token.name, token)
}

//  TODO: do not expose the language's tokens
function getTokens ({ language }) {
  return Array.from(language)
    .map(([ , { entity } ]) => entity)
}

function UbiquitousLanguage (data) {
  RequiresAttribute(data, {
    entities: 'entities'
  })

  const language = data.entities
    .reduce(addToken, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language })
  this.dependentsOf = dependentsOf.bind(this, { language })
  this.getTokens = getTokens.bind(null, { language })
}

module.exports = UbiquitousLanguage
