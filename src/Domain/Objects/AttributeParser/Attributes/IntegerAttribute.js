const Attribute = require('./Attribute')
const { Range, decorateWith } = require('./Decorators')

const decorate = decorateWith(Range)

function IntegerAttribute (data) {
  Object.assign(this, decorate(data), new Attribute({
    ...data,
    type: 'integer'
  }))
}

IntegerAttribute.isMatch = Attribute.includes('int', 'integer')

module.exports = IntegerAttribute
