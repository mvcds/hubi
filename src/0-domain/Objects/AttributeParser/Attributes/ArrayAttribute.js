const Attribute = require('./Attribute')
const { Range, decorateWith } = require('./Decorators')

const decorate = decorateWith(Range)

function ArrayAttribute (data) {
  Object.assign(this, decorate(data), new Attribute({
    ...data,
    type: 'array'
  }))

  this.of = data.of || 'object'
}

ArrayAttribute.isMatch = Attribute.includes('array')

module.exports = ArrayAttribute
