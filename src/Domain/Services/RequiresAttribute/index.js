function RequiresAttribute (attribute) {
  throw new Error(`The attribute "${attribute}" is required`)
}

module.exports = RequiresAttribute
