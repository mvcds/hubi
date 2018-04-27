const RequiresAttribute = require('../../Services/RequiresAttribute')

function dependenciesOf () {
  return []
}

function Translation (data) {
  RequiresAttribute(data, {
    lexicon: 'lexicon'
  })

  const { lexicon } = data

  this.dependenciesOf = dependenciesOf.bind(this, { lexicon })
}

module.exports = Translation
