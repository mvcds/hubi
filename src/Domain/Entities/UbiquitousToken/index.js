const NormalizeName = require('../../Services/NormalizeName')
const RequiresAttribute = require('../../Services/RequiresAttribute')

const Deprecated = require('../../Objects/Deprecated')

const DEPENDENCIES = {
  AttributeParser: require('../../Objects/AttributeParser')
}

function isToken ({ isToken }) {
  return isToken
}

function getMyTokens () {
  return this.attributes.filter(isToken)
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
  this.isAbstract = !!data.abstract
  this.comment = data.comment

  Object.defineProperty(this, 'myTokens', { get: getMyTokens })
}

module.exports = UbiquitousToken
