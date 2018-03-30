const Attribute = require('./Attribute')

function ArrayAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'array'
  }))

  this.of = attribute.of || 'object'
}

ArrayAttribute.isMatch = Attribute.includes('array')

module.exports = ArrayAttribute
