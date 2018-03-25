const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml'),
  glob: require('glob'),
  write: require('write')
}

function parseFile (_, fileContent) {
  const jsonContent = this.yaml.safeLoad(fileContent)

  const { name } = jsonContent

  this.write(`${this.output}/${name}.json`, JSON.stringify(jsonContent, null, '  '))
}

function readFile (filePath) {
  this.fs.readFile(filePath, 'utf8', parseFile.bind(this))
}

function sendToParser (_, files) {
  files.forEach(readFile, this)
}

function ParseFiles ({ pattern, output }, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  resolution.glob(pattern, sendToParser.bind({ ...resolution, output }))
}

module.exports = ParseFiles
