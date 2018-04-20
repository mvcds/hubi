function Deprecated (object, data) {
  if (!data) return {}

  if (typeof data === 'string') return new Deprecated(object, { message: data })

  this.deprecated = {
    message: data.message || `"${object.name}" is marked as deprecated`,
    error: !!data.error
  }
}

module.exports = Deprecated
