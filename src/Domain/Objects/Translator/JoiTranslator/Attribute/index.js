const DECORATORS = {
  max: require('./range.js'),
  min: require('./range.js'),
  arguments: require('./args.js')
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

const NUMBER = {
  types: ['float', 'integer'],
  fix: function ({ type }) {
    const base = 'Joi.number()'

    return type === 'integer' ? `${base}.integer()` : base
  }
}

const COMPOSABLE = {
  types: ['array'],
  fix: function ({ of: type, ...data }) {
    const joi = joify({ ...data, type })

    return `Joi.array().items(${joi})`
  }
}

const ARRAYIFYABLE = {
  types: ['boolean', 'date', ...NUMBER.types, 'json', 'object', 'string', 'function'],
  fix: function ({ type }) {
    return `Joi.${type}()`
  }
}

const JOI_TYPES = {
  NUMBER,
  COMPOSABLE,
  ARRAYIFYABLE
}

function isOfType ({ types }) {
  return types.includes(this.type)
}

function joify (data) {
  const type = Object.values(JOI_TYPES)
    .find(isOfType, data)

  return type ? type.fix(data) : 'Joi.object()'
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
