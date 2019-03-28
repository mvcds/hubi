const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

const UbiquitousToken = require('../../Entities/UbiquitousToken')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

const READ_OPTIONS = {
  encoding: 'utf8'
}

async function tokenize (filePath) {
  const { fs, yaml } = this

  const file = fs.readFileSync(filePath, READ_OPTIONS)

  const data = yaml.safeLoad(file)

  const token = new UbiquitousToken({ ...data, filePath })

  log(`Tokenized "${data.name}" as "${token.name}"`)

  return token
}

async function CreateUbiquitousLanguage (data, { glob, ...injected }) {
  RequiresAttribute(data, {
    globPattern: 'glob pattern'
  })

  const files = glob.sync(data.globPattern)

  log(`Found ${files.length} domain files`)

  const tokens = await Promise.all(
    files.map(tokenize, injected)
  )

  log('Tokens have been created')

  return new UbiquitousLanguage({ tokens })
}

module.exports = CreateUbiquitousLanguage
