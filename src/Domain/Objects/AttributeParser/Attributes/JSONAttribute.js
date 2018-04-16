const Attribute = require('./Attribute')

function JSONAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'json'
  }))
}

JSONAttribute.isMatch = Attribute.includes('json')

module.exports = JSONAttribute
