const Attribute = require('./Attribute')

function StringAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'string'
  }))
}

StringAttribute.isMatch = function isMatch (type) {
  return type === 'string' || type === undefined
}

module.exports = StringAttribute
