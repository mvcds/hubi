const RequiresAttribute = require('../../Services/RequiresAttribute')

function Attribute (data) {
  RequiresAttribute(data, {
    name: 'name',
    type: 'type'
  })

  this.name = data.name
  this.type = data.type
  this.isRequired = data.required || false
  this.description = data.description
}

Attribute.includes = function includes (...types) {
  return (type) => types.includes(type)
}

module.exports = Attribute
