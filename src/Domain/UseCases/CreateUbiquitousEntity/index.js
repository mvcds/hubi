const RequiresAttribute = require('../../Services/RequiresAttribute')

const Entity = require('../../Entities/Entity')

const DEPENDENCIES = {
  fs: require('fs'),
  yaml: require('js-yaml')
}

const READ_OPTIONS = {
  encoding: 'utf8'
}

async function CreateUbiquitousEntity ({
  filePath = RequiresAttribute('path to file')
}, injection) {
  const { fs, yaml } = Object.assign({}, DEPENDENCIES, injection)

  const file = fs.readFileSync(filePath, READ_OPTIONS)

  const asJSON = yaml.safeLoad(file)

  return new Entity(asJSON)
}

module.exports = CreateUbiquitousEntity
