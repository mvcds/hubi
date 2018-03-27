function parse () {
  const type = this.isRequired ? `${this.type}.required` : this.type

  return { [this.name]: type }
}

function requires (attribute) {
  throw new Error(`The attribute "${attribute}" is required`)
}

function Attribute ({
  name = requires('name'),
  type = requires('type'),
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
