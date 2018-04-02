const RequiresAttribute = require('../../Services/RequiresAttribute')

function learnEntity (language, entity) {
  return language.set(entity.name, { entity })
}

function UbiquitousLanguage ({
  entities = RequiresAttribute('entities')
}) {
  this.entities = entities.reduce(learnEntity, new Map())
}

module.exports = UbiquitousLanguage
