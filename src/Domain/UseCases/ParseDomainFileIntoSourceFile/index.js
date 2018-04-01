const Entity = require('../../Entities/Entity')

const ubi = require('../../Objects/Translator/UbiTranslator')
const log = require('../../Objects/Translator/LogTranslator')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  translators: {
    ubi,
    log
  },
  write: console.log
}

const READ_OPTIONS = {
  encoding: 'utf8'
}

function createEntityFromDomainFile (content, yaml) {
  const data = yaml.safeLoad(content)

  return new Entity(data)
}

//  TODO: translator as an object
async function ParseDomainFileIntoSourceFile ({ domain, source, translator }, injection) {
  const { fs, yaml, translators, write } = Object.assign({}, DEPENDENCIES, injection)

  const domainFileContent = fs.readFileSync(domain, READ_OPTIONS)

  const entity = createEntityFromDomainFile(domainFileContent, yaml)

  const translation = new translators[translator]({ entities: [ entity ], source })
    .translate()

  write(translation)
}

module.exports = ParseDomainFileIntoSourceFile
