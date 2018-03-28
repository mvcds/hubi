const ParseDomainFileIntoSourceFile = require('../ParseDomainFileIntoSourceFile')

const DEPENDENCIES = {
  glob: require('glob')
}

async function parseDomainFile (filePath) {
  return ParseDomainFileIntoSourceFile({
    domain: filePath,
    source: this.output
  }, this)
}

async function ParseDomainFilesFromPattern ({ pattern, output }, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  const files = resolution.glob.sync(pattern)

  const promises = files.map(parseDomainFile, { ...resolution, output })

  return Promise.all(promises)
}

module.exports = ParseDomainFilesFromPattern
