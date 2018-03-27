const Attribute = require('./Attribute')

function StringAttribute (attribute) {
  Object.assign(this, new Attribute({
    ...attribute,
    type: 'string'
  }))
}

StringAttribute.isMatch = Attribute.includes('string', undefined)

module.exports = StringAttribute
