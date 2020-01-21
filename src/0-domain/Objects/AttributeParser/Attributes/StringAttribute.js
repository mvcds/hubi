const Attribute = require('./Attribute')
const { Range, decorateWith } = require('./Decorators')

const decorate = decorateWith(Range)

function StringAttribute (data) {
  Object.assign(this, decorate(data), new Attribute({
    ...data,
    type: 'string'
  }))
}

StringAttribute.isMatch = Attribute.includes('string', undefined)

module.exports = StringAttribute
