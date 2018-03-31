const RequiresAttribute = require('../../Services/RequiresAttribute')

function translate ({ entities, transform }, injection) {
  return entities.map(transform)
}

function Translator ({
  entities = RequiresAttribute('entities'),
  transform = RequiresAttribute('transform function')
}) {
  this.translate = translate.bind(this, { entities, transform })
}

module.exports = Translator
