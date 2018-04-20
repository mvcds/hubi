const RequiresAttribute = require('../../../Services/RequiresAttribute')

const Deprecated = require('../../Deprecated')

function Attribute (data) {
  RequiresAttribute(data, {
    name: 'name',
    type: 'type'
  })

  this.name = data.name
  this.type = data.type
  this.isRequired = data.required || false
  this.description = data.description

  Object.assign(this, new Deprecated(this, data.deprecated))
}

Attribute.includes = function includes (...types) {
  return (type) => types.includes(type)
}

module.exports = Attribute
