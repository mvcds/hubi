function parse () {
  const { isRequired, type, of: arrayOf } = this

  const base = `Joi.${type}()`

  const wrapped = arrayOf ? `${base}.items(Joi.${arrayOf}())` : base

  return isRequired ? `${wrapped}.required()` : wrapped
}

function Attribute (data) {
  this.parse = parse.bind(data)
}

module.exports = Attribute
