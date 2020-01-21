const Joi = require('joi')

const SCHEMA = require('./ubiquitous-language.joi.js')

function addToken (language, token) {
  return language.set(token.name, token)
}

function interpret ({ interpretToken, translation }, [ name, token ]) {
  const wrappedToken = {
    token,
    translated: interpretToken(token)
  }

  return {
    interpretToken,
    translation: translation.set(name, wrappedToken)
  }
}

function translateEachToken ({ language }, { interpretToken }) {
  const { translation } = Array.from(language)
    .reduce(interpret, { interpretToken, translation: new Map() })

  return translation
}

function UbiquitousLanguage (data) {
  Joi.assert(data, SCHEMA)

  const language = data.tokens
    .reduce(addToken, new Map())

  this.translateEachToken = translateEachToken.bind(this, { language })
}

module.exports = UbiquitousLanguage
