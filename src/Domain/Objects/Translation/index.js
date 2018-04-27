const RequiresAttribute = require('../../Services/RequiresAttribute')

function Translation (data) {
  RequiresAttribute(data, {
    lexicon: 'lexicon'
  })

  const { lexicon } = data

  this.lexicon = lexicon
}

module.exports = Translation
