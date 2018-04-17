const Attribute = require('./Attribute')
const { Range, decorateWith } = require('./Decorators')

const decorate = decorateWith(Range)

function FloatAttribute (data) {
  Object.assign(this, decorate(data), new Attribute({
    ...data,
    type: 'float'
  }))
}

FloatAttribute.isMatch = Attribute.includes('float', 'number', 'decimal')

module.exports = FloatAttribute
