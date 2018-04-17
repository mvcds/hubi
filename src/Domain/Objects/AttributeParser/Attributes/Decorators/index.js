const Range = require('./Range.js')

function assign ({ attribute, data }, Decorator) {
  return {
    attribute: Object.assign(attribute, new Decorator(data)),
    data
  }
}

function decorate (attribute, data) {
  return this.decorators.reduce(assign, { attribute, data })
}

function decorateWith (...decorators) {
  return decorate.bind({ decorators })
}

module.exports = {
  decorateWith,
  Range
}
