const RequiresAttribute = require('../../Services/RequiresAttribute')

const CreateUbiquitousEntity = require('../CreateUbiquitousEntity')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

const DEPENDENCIES = {
  glob: require('glob')
}

async function createEntitty (filePath) {
  return CreateUbiquitousEntity({ filePath }, this)
}

async function CreateUbiquitousLanguageFromGlobPattern ({
  globPattern = RequiresAttribute('glob pattern')
}, injection) {
  const { glob, ...injected } = Object.assign({}, DEPENDENCIES, injection)

  const files = glob.sync(globPattern)

  const entities = await Promise.all(
    files.map(createEntitty, injected)
  )

  return new UbiquitousLanguage({ entities })
}

module.exports = CreateUbiquitousLanguageFromGlobPattern
