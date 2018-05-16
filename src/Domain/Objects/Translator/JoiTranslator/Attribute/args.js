function isRequired ({ required }) {
  return !!required
}

function Args ({ kind, data }) {
  const max = data.length
  const min = data.filter(isRequired).length

  return `.minArity(${min}).maxArity(${max})`
}

module.exports = Args
