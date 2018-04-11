const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function target ({ entity }) {
  console.log(entity)
}

function LogUbiquitousLanguageCommand (program) {
  program
    .command('log')
    .alias('l')
    .description('Logs the ubiquitous language entities to the console')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-t, --translator [translator]', 'Language translator (log|ubi|site|joi)', 'log')
    .action(WriteUbiquitousLanguage.bind({ target }))
}

module.exports = LogUbiquitousLanguageCommand
