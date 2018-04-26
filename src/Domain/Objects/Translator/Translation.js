const RequiresAttribute = require('../../Services/RequiresAttribute')

function Translation (data) {
  RequiresAttribute(data, {
    lexicon: 'lexicon'
  })

  const { lexicon } = data

  return lexicon
}

module.exports = Translation
