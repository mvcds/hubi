const RequiresAttribute = require('../RequiresAttribute')
const { log } = require('../LogConditionally')

const UbiquitousToken = require('../../Entities/UbiquitousToken')

const DEPENDENCIES = {
  glob: require('glob'),
  fs: require('fs'),
  yaml: require('js-yaml')
}
const READ_OPTIONS = {
  encoding: 'utf8'
}

async function LoadsTokens (data, dependencies) {
  RequiresAttribute(data, {
    globPattern: 'glob pattern'
  })

  const { glob, ...injected } = { ...DEPENDENCIES, dependencies }

  const files = await readFiles(data, glob)

  log(`Found ${files.length} domain files`)

  const tokens = await createTokens(files, injected)

  validate(tokens)

  //  TODO: create their "depenency network"?

  log('Tokens have been created')

  return tokens
}

function validate (tokens) {
  const names = tokens.reduce(mapNames, new Map())
  const aliases = tokens.reduce(mapAliases, new Map())

  const aliasedNamesErrors = Array.from(names.entries()).reduce(addErrorAliasedName.bind(null, aliases), [])

  const nameErrors = Array.from(names.entries()).reduce(addErrorName, [])
  const aliasErrors = Array.from(aliases.entries()).reduce(addErrorAlias, [])

  const errors = [...nameErrors, ...aliasErrors, ...aliasedNamesErrors]

  if (errors.length) {
    throw errors
  }
}

function addErrorAliasedName (aliases, errors, [name, token]) {
  const tokens = aliases.get(name)

  if (!tokens) return errors

  tokens.forEach(token => {
    errors.push(`There is a token named "${name}" but "${token.name}" uses it as an alias`)
  })

  return errors
}

function addErrorName (errors, [key, { length }]) {
  if (length === 1) {
    return errors
  }

  errors.push(`There are ${length} tokens named as "${key}"`)

  return errors
}

function addErrorAlias (errors, [key, {length}]) {
  if (length === 1) {
    return errors
  }

  errors.push(`There are ${length} tokens aliased as "${key}"`)

  return errors
}

function mapNames (map, token) {
  return mapPropertyToToken(map, token, token.name)
}

function mapPropertyToToken (map, token, key) {
  if (!map.has(key)) {
    map.set(key, [])
  }

  const list = map.get(key)

  list.push(token)

  return map
}

function mapAliases (map, token) {
  const { aliases = [] } = token

  aliases.forEach((alias) => {
    mapPropertyToToken(map, token, alias)
  })

  return map
}

//  TODO: read files asynchronouslly
async function readFiles ({ globPattern }, glob) {
  const files = glob.sync(globPattern)

  return files
}

async function createTokens (files, injected) {
  const tokenization = files.map(tokenize, injected)

  return Promise.all(tokenization)
}

async function tokenize (filePath) {
  const { fs, yaml } = this

  const file = fs.readFileSync(filePath, READ_OPTIONS)

  const data = yaml.safeLoad(file)

  const token = new UbiquitousToken({ ...data, filePath })

  log(`Tokenized "${data.name}" as "${token.name}"`)

  return token
}

module.exports = LoadsTokens
