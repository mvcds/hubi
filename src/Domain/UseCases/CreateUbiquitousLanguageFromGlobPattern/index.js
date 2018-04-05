const RequiresAttribute = require('../../Services/RequiresAttribute')

const DomainFile = require('../../Entities/DomainFile')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

const DEPENDENCIES = {
  glob: require('glob'),
  fs: require('fs'),
  yaml: require('js-yaml')
}

const READ_OPTIONS = {
  encoding: 'utf8'
}

async function readDomainFile (filePath) {
  const { fs, yaml } = this

  const file = fs.readFileSync(filePath, READ_OPTIONS)

  const asJSON = yaml.safeLoad(file)

  return new DomainFile(asJSON)
}

async function CreateUbiquitousLanguageFromGlobPattern (data, injection) {
  RequiresAttribute(data, {
    globPattern: 'glob pattern'
  })

  const { glob, ...injected } = Object.assign({}, DEPENDENCIES, injection)

  const files = glob.sync(data.globPattern)

  const entities = await Promise.all(
    files.map(readDomainFile, injected)
  )

  return new UbiquitousLanguage({ entities })
}

module.exports = CreateUbiquitousLanguageFromGlobPattern