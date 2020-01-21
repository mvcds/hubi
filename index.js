const save = require('./src/0-domain/UseCases/SaveUbiquitousLanguageIntoFile')
const log = require('./src/0-domain/UseCases/LogUbiquitousLanguageIntoConsole')

const Hubi = {
  log,
  save
}

module.exports = Hubi
