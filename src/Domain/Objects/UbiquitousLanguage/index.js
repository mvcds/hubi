const RequiresAttribute = require('../../Services/RequiresAttribute')

const dependenciesOf = require('./dependenciesOf')
const dependentsOf = require('./dependentsOf')

function addToken (language, token) {
  return language.set(token.name, token)
}

function interpret ({ interpretToken, interpretation }, [ name, token ]) {
  const interpreted = interpretToken(token)

  return {
    interpretToken,
    interpretation: interpretation.set(name, interpreted)
  }
}

function mapInterpretation ({ language }, { interpretToken }) {
  const { interpretation } = Array.from(language)
    .reduce(interpret, { interpretToken, interpretation: new Map() })

  return interpretation
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
