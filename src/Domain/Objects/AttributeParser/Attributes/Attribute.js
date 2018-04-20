const RequiresAttribute = require('../../../Services/RequiresAttribute')

function deprecate (data, name) {
  if (!data) return

  if (typeof data === 'string') return deprecate({ message: data }, name)

  return {
    message: data.message || `"${name}" is marked as deprecated`,
    error: !!data.error
  }
}

function Attribute (data) {
  RequiresAttribute(data, {
    name: 'name',
    type: 'type'
  })

  this.name = data.name
  this.type = data.type
  this.isRequired = data.required || false
  this.description = data.description
  this.deprecated = deprecate(data.deprecated, data.name)
}

Attribute.includes = function includes (...types) {
  return (type) => types.includes(type)
}

module.exports = Attribute
