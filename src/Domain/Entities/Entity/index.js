function parse (domain) {
  return JSON.stringify(domain, null, '  ')
}

function Entity ({ domain }, injection) {
  this.parse = parse.bind(this, domain)

  return this
}

module.exports = Entity
