const DECORATORS = {
  max: require('./range.js')
}

function decorate (decorations, [ kind, data ]) {
  const decorate = DECORATORS[kind]

  if (data === undefined || decorate === undefined) return decorations

  const decoration = decorate({ kind, data })

  return [
    ...decorations,
    decoration
  ]
}

function parse () {
  const { isRequired, type, of: arrayOf, ...data } = this

  const decorations = Object.entries(data)
    .reduce(decorate, [])

  const base = `Joi.${type}()`

  const wrapped = arrayOf ? `${base}.items(Joi.${arrayOf}())` : base

  const parsed = isRequired ? `${wrapped}.required()` : wrapped

  return parsed.concat(decorations)
}

function Attribute (data) {
  this.parse = parse.bind(data)
}

module.exports = Attribute
