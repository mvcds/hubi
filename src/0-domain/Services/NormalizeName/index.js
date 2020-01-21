function NormalizeName (name) {
  return name.toLowerCase()
    .split(' ')
    .join('-')
}

module.exports = NormalizeName
