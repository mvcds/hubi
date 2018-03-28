const Entity = require('../../Entities/Entity')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  write: require('write')
}

const READ_OPTIONS = {
  encoding: 'utf8'
}

function createEntityFromDomainFile (content, yaml) {
  const data = yaml.safeLoad(content)

  return new Entity(data)
}

async function ParseDomainFileIntoSourceFile ({ domain, source }, injection) {
  const { fs, yaml, write } = Object.assign({}, DEPENDENCIES, injection)

  const domainFileContent = fs.readFileSync(domain, READ_OPTIONS)

  const entity = createEntityFromDomainFile(domainFileContent, yaml)

  write(`${source}/${entity.name}.ubi.js`, entity.parse())
}

module.exports = ParseDomainFileIntoSourceFile
