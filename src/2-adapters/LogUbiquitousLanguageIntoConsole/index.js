const DEPENDENCIES = {
  UseCase: require('hubi-features/LogUbiquitousLanguageIntoConsole')
}

async function LogUbiquitousLanguageIntoConsole (data) {
  const { UseCase } = Object.assign({}, DEPENDENCIES)

  //  TODO: "typechecking"

  return UseCase(data)
}

LogUbiquitousLanguageIntoConsole.Defaults = {
  pattern: 'src/**/*.yml',
  translator: 'log'
}

module.exports = LogUbiquitousLanguageIntoConsole
