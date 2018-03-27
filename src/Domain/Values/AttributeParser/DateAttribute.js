const Attribute = require('./Attribute')

function DateAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'date'
  }))
}

DateAttribute.isMatch = Attribute.includes('date')

module.exports = DateAttribute
