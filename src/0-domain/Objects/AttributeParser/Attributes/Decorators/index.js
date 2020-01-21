const Range = require('./Range.js')

function assign ({ decoration, data }, Decorator) {
  return {
    decoration: Object.assign(decoration, new Decorator(data)),
    data
  }
}

function decorate (data) {
  const { decoration } = this.decorators.reduce(assign, {
    data,
    decoration: {}
  })

  return decoration
}

function decorateWith (...decorators) {
  return decorate.bind({ decorators })
}

module.exports = {
  decorateWith,
  Range
}
