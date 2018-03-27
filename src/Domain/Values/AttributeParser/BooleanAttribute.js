const Attribute = require('./Attribute')

function BooleanAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'boolean'
  }))
}

BooleanAttribute.isMatch = function isMatch (type) {
  return type === 'bool' || type === 'boolean'
}

module.exports = BooleanAttribute
