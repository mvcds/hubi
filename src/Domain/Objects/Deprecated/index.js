function Deprecated ({ name, deprecated }) {
  if (!deprecated) return {}

  if (typeof deprecated === 'string') {
    const depreciation = {
      message: deprecated
    }

    return new Deprecated({ name, deprecated: depreciation })
  }

  this.deprecated = {
    message: deprecated.message || `"${name}" is marked as deprecated`,
    error: !!deprecated.error
  }
}

module.exports = Deprecated
