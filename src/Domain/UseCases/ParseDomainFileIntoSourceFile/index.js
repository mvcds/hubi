const Entity = require('../../Entities/Entity')

const ubi = require('../../Objects/Translators/UbiTranslator')
const log = require('../../Objects/Translators/LogTranslator')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  translators: {
    ubi,
    log
  }
}

const READ_OPTIONS = {
  encoding: 'utf8'
}

function createEntityFromDomainFile (content, yaml) {
  const data = yaml.safeLoad(content)

  return new Entity(data)
}

//  TODO: parser as an object
async function ParseDomainFileIntoSourceFile ({ domain, source, translator }, injection) {
  const { fs, yaml, translators } = Object.assign({}, DEPENDENCIES, injection)

  const domainFileContent = fs.readFileSync(domain, READ_OPTIONS)

  const entity = createEntityFromDomainFile(domainFileContent, yaml)

  return new translators[translator]({ entity, source })
    .translate(injection)
}

module.exports = ParseDomainFileIntoSourceFile
