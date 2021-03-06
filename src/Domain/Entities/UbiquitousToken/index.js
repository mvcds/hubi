const Joi = require('joi')

const NormalizeName = require('../../Services/NormalizeName')

const Deprecated = require('../../Objects/Deprecated')

const SCHEMA = require('./ubiquitous-token.joi.js')

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
  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  const attributes = data.attributes ? data.attributes.map(AttributeParser) : []
  const aliases = data.aliases && data.aliases.map(NormalizeName)

  Object.assign(this, Joi.attempt(data, SCHEMA), {
    attributes,
    aliases,
    name: NormalizeName(data.name),
    rawName: data.name,
    rawAliases: data.aliases
  }, new Deprecated(data))

  //  TODO: allow to rename before using attempt
  this.isAbstract = this.abstract
  delete this.abstract

  Object.defineProperty(this, 'myTokens', { get: getMyTokens })
}

module.exports = UbiquitousToken
