const RequiresAttribute = require('hubi-domain/Services/RequiresAttribute')
const LogConditionally = require('hubi-domain/Services/LogConditionally')
const LoadsTokens = require('hubi-domain/Services/LoadsTokens')

const UbiquitousLanguage = require('hubi-domain/Objects/UbiquitousLanguage')

const DEPENDENCIES = {
  glob: require('glob'),
  fs: require('fs'),
  yaml: require('js-yaml')
}

async function TranslateDomainFilesToUbiquitousLanguage (data, injection) {
  const resolved = Object.assign({}, DEPENDENCIES, injection)

  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  const { pattern: globPattern, translator, verbose } = data

  LogConditionally({ canLog: verbose })

  const tokens = await LoadsTokens({ globPattern }, resolved)

  const ubiquitousLanguage = new UbiquitousLanguage({ tokens })

  return translator.translate({ ubiquitousLanguage })
}

module.exports = TranslateDomainFilesToUbiquitousLanguage
