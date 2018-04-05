function fail (attribute) {
  throw new Error(`The attribute "${attribute}" is required`)
}

function test ([ key, attribute ]) {
  (this[key] === undefined || this[key] === null) && fail(attribute)
}

function requires (data, requirements) {
  Object.entries(requirements)
    .forEach(test, data)
}

function RequiresAttribute (data, requirements) {
  requires({ data, requirements }, {
    data: 'data',
    requirements: 'requirements'
  })

  requires(data, requirements)
}

module.exports = RequiresAttribute
