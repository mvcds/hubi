const Entity = require('../../Entities/Entity')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  write: require('write')
}

function parseFile (_, fileContent) {
  const rawEntity = this.yaml.safeLoad(fileContent)

  const { name } = rawEntity

  const entity = new Entity({ data: rawEntity }, this)

  this.write(`${this.source}/${name}.ubi.js`, entity.parse())
  this.resolve()
}

async function ParseDomainFileIntoSourceFile ({ domain, source }, injection) {
  const { fs, yaml, write } = Object.assign({}, DEPENDENCIES, injection)

  return new Promise((resolve) => {
    fs.readFile(domain, 'utf8', parseFile.bind({ source, yaml, write, resolve }))
  })
}

module.exports = ParseDomainFileIntoSourceFile
