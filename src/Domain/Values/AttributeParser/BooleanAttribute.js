const Attribute = require('./Attribute')

function BooleanAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'boolean'
  }))
}

BooleanAttribute.isMatch = Attribute.includes('bool', 'boolean')

module.exports = BooleanAttribute
