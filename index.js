const save = require('hubi-domain/UseCases/SaveUbiquitousLanguageIntoFile')
const log = require('hubi-domain/UseCases/LogUbiquitousLanguageIntoConsole')

const Hubi = {
  log,
  save
}

module.exports = Hubi
