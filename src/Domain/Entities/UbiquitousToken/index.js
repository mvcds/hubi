const NormalizeName = require('../../Services/NormalizeName')
const RequiresAttribute = require('../../Services/RequiresAttribute')

const Deprecated = require('../../Objects/Deprecated')

const DEPENDENCIES = {
  AttributeParser: require('../../Objects/AttributeParser')
}

function isInstance ({ isInstance }) {
  return isInstance
}

function getMyTokens () {
  return this.attributes.filter(isInstance)
}

function UbiquitousToken (data, injection) {
  RequiresAttribute(data, {
    name: 'name',
    description: 'description',
    filePath: 'file to path'
  })

  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  const attributes = data.attributes ? data.attributes.map(AttributeParser) : []

  Object.assign(this, data, { attributes }, new Deprecated(data))
  this.filePath = data.filePath
  this.name = NormalizeName(data.name)
  this.rawName = data.name

  Object.defineProperty(this, 'myTokens', { get: getMyTokens })
}

module.exports = UbiquitousToken
