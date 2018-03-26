function parse () {
  return {
    [this.name]: this.type
  }
}

function StringAttribute (attribute) {
  this.name = attribute.name
  this.type = 'string'

  this.parse = parse.bind(this)
}

StringAttribute.isMatch = function isMatch (type) {
  return type === 'string' || type === undefined
}

module.exports = StringAttribute
