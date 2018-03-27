const Attribute = require('./Attribute')

function ObjectAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'object'
  }))
}

ObjectAttribute.isMatch = Attribute.includes('object', 'shape')

module.exports = ObjectAttribute
