const save = require('./src/Domain/UseCases/SaveUbiquitousLanguageIntoFile')
const log = require('./src/Domain/UseCases/LogUbiquitousLanguageIntoConsole')

const Hubi = {
  save,
  log
}

module.exports = Hubi
