function Range ({ kind, data }) {
  if (typeof data === 'number') return `.${kind}(${data})`

  throw 'not range'
}

module.exports = Range
