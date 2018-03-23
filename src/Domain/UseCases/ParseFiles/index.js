const DEFAULTS = {
  pattern: `${process.env.PWD}/**/*.yml`,
  output: 'domain'
}

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  glob: require('glob'),
  write: require('write')
}

function parseFile(error, data) {
  const jsonFile = this.resolution.yaml.safeLoad(data)

  const { name } = jsonFile

  this.resolution.write(`${this.output}/${name}.json`, JSON.stringify(jsonFile, null, '  '))
}

function readFile(filePath) {
  this.resolution.fs.readFile(filePath, 'utf8', parseFile.bind(this))
}

function sendToParser(error, files) {
  files.forEach(readFile, this)
}

function ParseFiles(params, injection) {
  const { pattern, output } = Object.assign({}, DEFAULTS, params)
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  resolution.glob(pattern, sendToParser.bind({ resolution, output }))
}

module.exports = ParseFiles
