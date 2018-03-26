const ParseDomainFileIntoSourceFile = require('../ParseDomainFileIntoSourceFile')

const DEPENDENCIES = {
  glob: require('glob')
}

function parseDomainFile (filePath) {
  ParseDomainFileIntoSourceFile({
    domain: filePath,
    source: this.output
  }, this)
}

function sendToParser (_, files) {
  files.forEach(parseDomainFile, this)
}

function ParseDomainFilesFromPattern ({ pattern, output }, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  resolution.glob(pattern, sendToParser.bind({ ...resolution, output }))
}

module.exports = ParseDomainFilesFromPattern
