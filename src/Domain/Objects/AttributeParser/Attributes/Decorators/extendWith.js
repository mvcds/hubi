function assign ({ attribute, data }, Decorator) {
  return {
    attribute: Object.assign(attribute, new Decorator(data)),
    data
  }
}

function extend (attribute, data) {
  return this.decorators.reduce(assign, { attribute, data })
}

function extendWith (...decorators) {
  return extend.bind({ decorators })
}

module.exports = extendWith
