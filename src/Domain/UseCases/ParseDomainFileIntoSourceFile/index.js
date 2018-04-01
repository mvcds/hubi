const RequiresAttribute = require('../../Services/RequiresAttribute')

const ubi = require('../../Objects/Translator/UbiTranslator')
const log = require('../../Objects/Translator/LogTranslator')

const CreateUbiquitousEntity = require('../CreateUbiquitousEntity')

const DEPENDENCIES = {
  translators: {
    ubi,
    log
  },
  write: console.log
}

//  TODO: translator as an object
async function ParseDomainFileIntoSourceFile ({
  domain = RequiresAttribute('domain'),
  translator = RequiresAttribute('translator')
}, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  const { translators, write } = resolution

  const entity = await CreateUbiquitousEntity({
    filePath: domain
  }, resolution)

  const translation = new translators[translator]({ entities: [ entity ] })
    .translate()

  write(translation)
}

module.exports = ParseDomainFileIntoSourceFile
