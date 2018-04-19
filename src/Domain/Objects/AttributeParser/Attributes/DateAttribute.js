const Attribute = require('./Attribute')
const { Range, decorateWith } = require('./Decorators')

const decorate = decorateWith(Range)

function DateAttribute (data) {
  Object.assign(this, decorate(data), new Attribute({
    ...data,
    type: 'date'
  }))
}

DateAttribute.isMatch = Attribute.includes('date')

module.exports = DateAttribute
