const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')

function addToken (language, token) {
  return language.set(token.name, token)
}

function associateNameWithObject ([ name, token ]) {
  const object = this.interpretToken(token)

  return { name, object }
}

function mapInterpretation ({ language }, { interpretToken }) {
  return Array.from(language)
    .map(associateNameWithObject, { interpretToken })
}

function UbiquitousLanguage (data) {
  RequiresAttribute(data, {
    tokens: 'tokens'
  })

  const language = data.tokens
    .reduce(addToken, new Map())

  this.dependenciesOf = dependenciesOf.bind(this, { language })
  this.dependentsOf = dependentsOf.bind(this, { language })
  this.mapInterpretation = mapInterpretation.bind(this, { language })
}

module.exports = UbiquitousLanguage
