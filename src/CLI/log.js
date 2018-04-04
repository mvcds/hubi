const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function stringify (fixture) {
  return ((typeof fixture === 'object') ? JSON.stringify(fixture, null, 2) : fixture).trim()
}

function write (entity) {
  const value = stringify(entity)

  console.log(value)
}

function LogUbiquitousLanguageCommand (program) {
  program
    .command('log')
    .alias('l')
    .description('Logs the ubiquitous language entities to the console')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-t, --translator [translator]', 'Language translator (log|ubi)', 'log')
    .action(WriteUbiquitousLanguage.bind({ write }))
}

module.exports = LogUbiquitousLanguageCommand
