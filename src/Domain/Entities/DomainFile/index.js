const RequiresAttribute = require('../../Services/RequiresAttribute')

const DEPENDENCIES = {
  AttributeParser: require('../../Objects/AttributeParser')
}

const UbiquitousToken = require('./UbiquitousToken')

function tokenize () {
  console.log(`Tokenizing "${this.name}"`)

  return new UbiquitousToken({ object: this })
}

function DomainFile (data, injection) {
  RequiresAttribute(data, {
    name: 'name',
    description: 'description',
    attributes: 'attributes'
  })

  const { AttributeParser } = Object.assign({}, DEPENDENCIES, injection)

  const attributes = data.attributes.map(AttributeParser)

  this.tokenize = tokenize.bind({ ...data, attributes })
}

module.exports = DomainFile
