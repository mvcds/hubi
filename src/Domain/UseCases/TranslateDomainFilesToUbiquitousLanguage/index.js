const RequiresAttribute = require('../../Services/RequiresAttribute')
const LogConditionally = require('../../Services/LogConditionally')
const LoadsTokens = require('../../Services/LoadsTokens')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

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
