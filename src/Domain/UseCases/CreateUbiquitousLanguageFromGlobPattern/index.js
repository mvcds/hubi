const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

const UbiquitousToken = require('../../Entities/UbiquitousToken')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

const DEPENDENCIES = {
  glob: require('glob'),
  fs: require('fs'),
  yaml: require('js-yaml')
}

const READ_OPTIONS = {
  encoding: 'utf8'
}

async function tokenize (filePath) {
  const { fs, yaml } = this

  const file = fs.readFileSync(filePath, READ_OPTIONS)

  const data = yaml.safeLoad(file)

  log(`Tokenizing "${data.name}"`)

  return new UbiquitousToken({ ...data, filePath })
}

async function CreateUbiquitousLanguageFromGlobPattern (data, injection) {
  RequiresAttribute(data, {
    globPattern: 'glob pattern'
  })

  const { glob, ...injected } = Object.assign({}, DEPENDENCIES, injection)

  const files = glob.sync(data.globPattern)

  log(`Found ${files.length} domain files`)

  const tokens = await Promise.all(
    files.map(tokenize, injected)
  )

  log('Tokens have been created')

  return new UbiquitousLanguage({ tokens })
}

module.exports = CreateUbiquitousLanguageFromGlobPattern
