function Range ({ kind, data }) {
  if (typeof data === 'number') return `.${kind}(${data})`

  if (!data.limit) throw new Error(`No limit for range "${kind}"`)

  if (data.encode) return `.${kind}(${data.limit}, ${data.encode})`

  return `.${kind}(${data.limit})`
}

module.exports = Range
