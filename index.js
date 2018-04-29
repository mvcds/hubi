const save = require('./src/Domain/UseCases/SaveUbiquitousLanguageIntoFile')
const log = require('./src/Domain/UseCases/LogUbiquitousLanguageIntoConsole')

const Hubi = {
  log,
  save
}

module.exports = Hubi
