const Entity = require('../../Entities/Entity')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  glob: require('glob'),
  write: require('write')
}

function parseFile (_, fileContent) {
  const domain = this.yaml.safeLoad(fileContent)

  const { name } = domain

  const entity = new Entity({ domain }, this)

  this.write(`${this.output}/${name}.ubi.js`, entity.parse())
}

function readFile (filePath) {
  this.fs.readFile(filePath, 'utf8', parseFile.bind(this))
}

function sendToParser (_, files) {
  files.forEach(readFile, this)
}

function ParseDomainFilesFromPattern ({ pattern, output }, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  resolution.glob(pattern, sendToParser.bind({ ...resolution, output }))
}

module.exports = ParseDomainFilesFromPattern
