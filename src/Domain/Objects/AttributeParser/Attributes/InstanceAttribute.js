const NormalizeName = require('../../../Services/NormalizeName')

const Attribute = require('./Attribute')

//  TODO: InstanceAttribute => TokenAttribute
function InstanceAttribute (data) {
  Object.assign(this, new Attribute({
    ...data,
    type: NormalizeName(data.type)
  }), { isInstance: true })
}

module.exports = InstanceAttribute
