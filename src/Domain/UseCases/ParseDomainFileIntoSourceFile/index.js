const Entity = require('../../Entities/Entity')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  write: require('write')
}

function parseFile (_, fileContent) {
  const domain = this.yaml.safeLoad(fileContent)

  const { name } = domain

  const entity = new Entity({ domain }, this)

  this.write(`${this.source}/${name}.ubi.js`, entity.parse())
}

function ParseDomainFileIntoSourceFile ({ domain, source }, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  resolution.fs.readFile(domain, 'utf8', parseFile.bind({ ...resolution, source }))
}

module.exports = ParseDomainFileIntoSourceFile
