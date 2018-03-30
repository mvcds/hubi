const Entity = require('../../Entities/Entity')
const ubi = require('../../Values/UbiParser')
const log = require('../../Values/LogParser')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  parsers: {
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
async function ParseDomainFileIntoSourceFile ({ domain, source, parserName }, injection) {
  const { fs, yaml, parsers } = Object.assign({}, DEPENDENCIES, injection)

  const domainFileContent = fs.readFileSync(domain, READ_OPTIONS)

  const entity = createEntityFromDomainFile(domainFileContent, yaml)

  const parser = new parsers[parserName]({ entity, source })

  parser.parse(injection)
}

module.exports = ParseDomainFileIntoSourceFile
