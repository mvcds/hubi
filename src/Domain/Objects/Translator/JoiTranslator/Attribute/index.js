const DECORATORS = {
  max: require('./range.js'),
  min: require('./range.js')
}

const NUMBERS = ['float', 'integer']

function decorate (decorations, [ kind, data ]) {
  const decorate = DECORATORS[kind]

  if (data === undefined || decorate === undefined) return decorations

  const decoration = decorate({ kind, data })

  return [
    ...decorations,
    decoration
  ]
}

function asBase (type) {
  if (!NUMBERS.includes(type)) return `Joi.${type}()`

  const base = 'Joi.number()'

  return type === 'integer' ? `${base}.integer()` : base
}

function parse () {
  const { isRequired, type, of: arrayOf, default: standard, ...rest } = this

  const base = asBase(type)

  const wrapped = arrayOf ? `${base}.items(Joi.${arrayOf}())` : base

  const parsed = isRequired ? `${wrapped}.required()` : wrapped

  const decorations = Object.entries(rest)
    .reduce(decorate, [])

  const decorated = parsed.concat(decorations)

  return standard === undefined ? decorated : decorated.concat(`.default(${standard})`)
}

function Attribute (data) {
  this.parse = parse.bind(data)
}

module.exports = Attribute
