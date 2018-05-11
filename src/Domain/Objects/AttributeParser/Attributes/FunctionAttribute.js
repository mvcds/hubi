const Attribute = require('./Attribute')

function FunctionAttribute (data) {
  Object.assign(this, new Attribute({
    ...data,
    type: 'function'
  }))
}

FunctionAttribute.isMatch = Attribute.includes('function', 'func', 'method', 'procedure')

module.exports = FunctionAttribute
