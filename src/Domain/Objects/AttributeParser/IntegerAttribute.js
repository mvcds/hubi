const Attribute = require('./Attribute')

function IntegerAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'integer'
  }))
}

IntegerAttribute.isMatch = Attribute.includes('int', 'integer')

module.exports = IntegerAttribute
