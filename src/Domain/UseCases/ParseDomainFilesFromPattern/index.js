const ParseDomainFileIntoSourceFile = require('../ParseDomainFileIntoSourceFile')

const DEPENDENCIES = {
  glob: require('glob'),
  write: console.log
}

async function parseDomainFile (filePath) {
  return ParseDomainFileIntoSourceFile({
    domain: filePath,
    source: this.output,
    translator: this.translator
  }, this)
}

async function ParseDomainFilesFromPattern ({ pattern, output, translator }, injection) {
  const resolution = Object.assign({}, DEPENDENCIES, injection)

  const files = resolution.glob.sync(pattern)

  const promises = files.map(parseDomainFile, { ...resolution, output, translator })

  return Promise.all(promises)
}

module.exports = ParseDomainFilesFromPattern
