const { lorem, random } = require('faker')

function range ({ kind = lorem.word(), data }) {
  return { kind, data }
}

function number () {
  return range({ data: random.number() })
}

function limitless (kind) {
  return range({ kind, data: {} })
}

function encodeless () {
  const data = {
    limit: random.number()
  }

  return range({ data })
}

function complete () {
  const data = {
    limit: random.number(),
    encode: lorem.word()
  }

  return range({ data })
}

module.exports = {
  number,
  limitless,
  encodeless,
  complete
}
