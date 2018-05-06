const DECORATORS = {
  max: require('./range.js'),
  min: require('./range.js')
}

const NUMBERS = ['float', 'integer']

const ARRAYIFYABLE = ['boolean', 'date', ...NUMBERS, 'json', 'object', 'string']

function decorate (decorations, [ kind, data ]) {
  const decorate = DECORATORS[kind]

  if (data === undefined || decorate === undefined) return decorations

  const decoration = decorate({ kind, data })

  return [
    ...decorations,
    decoration
  ]
}

function fixNumber ({ type }) {
  const base = 'Joi.number()'

  return type === 'integer' ? `${base}.integer()` : base
}

function fixArray ({ of: type, ...data }) {
  const joi = joify({ ...data, type })

  return `Joi.array().items(${joi})`
}

function joify (data) {
  const { type } = data

  if (NUMBERS.includes(type)) return fixNumber(data)

  if (type === 'array') return fixArray(data)

  const joi = ARRAYIFYABLE.includes(type) ? type : 'object'

  return `Joi.${joi}()`
}

function parse () {
  const { isRequired, type, of: arrayOf, default: standard, ...rest } = this

  const joi = joify(this)

  const parsed = isRequired ? `${joi}.required()` : joi

  const decorations = Object.entries(rest)
    .reduce(decorate, [])

  const decorated = parsed.concat(decorations)

  return standard === undefined ? decorated : decorated.concat(`.default(${standard})`)
}

function Attribute (data) {
  this.parse = parse.bind(data)
}

module.exports = Attribute
