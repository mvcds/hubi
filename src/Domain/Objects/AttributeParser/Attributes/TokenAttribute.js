const NormalizeName = require('../../../Services/NormalizeName')

const Attribute = require('./Attribute')

function TokenAttribute (data) {
  Object.assign(this, new Attribute({
    ...data,
    type: NormalizeName(data.type)
  }), { isToken: true })
}

module.exports = TokenAttribute
