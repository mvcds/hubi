const Attribute = require('./Attribute')

function FloatAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'float'
  }))
}

FloatAttribute.isMatch = Attribute.includes('float', 'number', 'decimal')

module.exports = FloatAttribute
