const RequiresAttribute = require('../../Services/RequiresAttribute')
const LogConditionally = require('../../Services/LogConditionally')

const CreateUbiquitousLanguage = require('./CreateUbiquitousLanguage')

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

  const ubiquitousLanguage = await CreateUbiquitousLanguage({ globPattern }, resolved)

  return translator.translate({ ubiquitousLanguage })
}

module.exports = TranslateDomainFilesToUbiquitousLanguage
