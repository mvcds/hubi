const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')
const UbiquitousToken = require('./UbiquitousToken')

function addToken (language, entity) {
  const token = new UbiquitousToken({ entity })

  return language.set(token.name, token)
}

function associateNameWithToken ([ name, token ]) {
  const entity = this.interpretEntity(token.entity)

  return { name, entity }
}

function interpret ({ language }, { interpretEntity }) {
  return Array.from(language)
    .map(associateNameWithToken, { interpretEntity })
}

function UbiquitousLanguage (data) {
  RequiresAttribute(data, {
    entities: 'entities'
  })

  const language = data.entities
    .reduce(addToken, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language })
  this.dependentsOf = dependentsOf.bind(this, { language })
  this.interpret = interpret.bind(this, { language })
}

module.exports = UbiquitousLanguage
