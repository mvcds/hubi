const RequiresAttribute = require('../../Services/RequiresAttribute')

function parse () {
  const type = this.isRequired ? `${this.type}.required` : this.type

  return { [this.name]: type }
}

function Attribute ({
  name = RequiresAttribute('name'),
  type = RequiresAttribute('type'),
  required = false
}) {
  this.name = name
  this.type = type
  this.isRequired = required

  this.parse = parse.bind(this)
}

Attribute.includes = function includes (...types) {
  return (type) => types.includes(type)
}

module.exports = Attribute
