const NormalizeName = require('../../../Services/NormalizeName')

const Attribute = require('./Attribute')

function InstanceAttribute (data) {
  Object.assign(this, new Attribute({
    ...data,
    type: NormalizeName(data.type)
  }))
}

module.exports = InstanceAttribute
