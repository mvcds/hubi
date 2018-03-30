const RequiresAttribute = require('../../Services/RequiresAttribute')

function Attribute ({
  name = RequiresAttribute('name'),
  type = RequiresAttribute('type'),
  required = false
}) {
  this.name = name
  this.type = type
  this.isRequired = required
}

Attribute.includes = function includes (...types) {
  return (type) => types.includes(type)
}

module.exports = Attribute
