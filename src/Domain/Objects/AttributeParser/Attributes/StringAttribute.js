const Attribute = require('./Attribute')
const { Range, extendWith } = require('./Decorators')

const extend = extendWith(Range)

function StringAttribute (attribute) {
  Object.assign(this, extend(this, attribute), new Attribute({
    ...attribute,
    type: 'string'
  }))
}

StringAttribute.isMatch = Attribute.includes('string', undefined)

module.exports = StringAttribute
