const RequiresAttribute = require('../../Services/RequiresAttribute')

function Translation (data) {
  RequiresAttribute(data, {
    lexicon: 'lexicon'
  })

  const { lexicon } = data

  return Array.isArray(lexicon) ? lexicon : [ lexicon ]
}

module.exports = Translation
