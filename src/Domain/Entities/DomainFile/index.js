const RequiresAttribute = require('../../Services/RequiresAttribute')
const { log } = require('../../Services/LogConditionally')

const DEPENDENCIES = {
  AttributeParser: require('../../Objects/AttributeParser')
}

const UbiquitousToken = require('./UbiquitousToken')

function tokenize (filePath) {
  log(`Tokenizing "${this.name}"`)

  return new UbiquitousToken({ object: this, filePath })
}

//  TODO: get rid of it, in favor of the token?
function DomainFile (data, injection) {
  RequiresAttribute(data, {
    name: 'name',
    description: 'description',
    attributes: 'attributes',
    filePath: 'file to path'
  })

  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  const attributes = data.attributes.map(AttributeParser)
  const { filePath, ...rest } = data

  this.tokenize = tokenize.bind({ ...rest, attributes }, filePath)
}

module.exports = DomainFile
