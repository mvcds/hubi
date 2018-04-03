const LogUbiquitousLanguageFile = require('../Domain/UseCases/LogUbiquitousLanguageFile')

function LogUbiquitousLanguageFileCommand (program) {
  program
    .command('log')
    .alias('l')
    .description('Logs the ubiquitous language entities to the console')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-t, --translator [translator]', 'Language translator (log|ubi)', 'log')
    .action(LogUbiquitousLanguageFile)
}

module.exports = LogUbiquitousLanguageFileCommand
