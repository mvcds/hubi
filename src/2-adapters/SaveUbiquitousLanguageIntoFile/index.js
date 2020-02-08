const log = require('../LogUbiquitousLanguageIntoConsole')

const DEPENDENCIES = {
  UseCase: require('hubi-features/SaveUbiquitousLanguageIntoFile')
}

async function SaveUbiquitousLanguageIntoFile (data) {
  const { UseCase } = Object.assign({}, DEPENDENCIES)

  //  TODO: "typechecking"

  return UseCase(data)
}

SaveUbiquitousLanguageIntoFile.Defaults = {
  ...log.Defaults,
  output: 'domain',
  watch: false
}

module.exports = SaveUbiquitousLanguageIntoFile
