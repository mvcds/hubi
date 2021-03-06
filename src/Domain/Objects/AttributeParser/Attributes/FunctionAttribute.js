const Attribute = require('./Attribute')

function FunctionAttribute (data) {
  Object.assign(this, new Attribute({
    ...data,
    type: 'function'
  }))

  this.return = data.return
  this.arguments = data.arguments
}

FunctionAttribute.isMatch = Attribute.includes('function', 'func', 'method', 'procedure')

module.exports = FunctionAttribute
