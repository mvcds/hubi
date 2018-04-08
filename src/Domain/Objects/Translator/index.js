const RequiresAttribute = require('../../Services/RequiresAttribute')

function translate ({ ubiquitousLanguage, interpretEntity }) {
  return ubiquitousLanguage.interpret({ interpretEntity })
}

function Translator (data) {
  RequiresAttribute(data, {
    ubiquitousLanguage: 'ubiquitous language',
    interpretEntity: 'interpret entity function'
  })

  const { ubiquitousLanguage, interpretEntity } = data

  this.translate = translate.bind(null, { ubiquitousLanguage, interpretEntity })
}

module.exports = Translator
