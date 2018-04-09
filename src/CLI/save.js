const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function target ({ entity, write, filePath }) {
  write(filePath, entity)
}

function SaveUbiquitousLanguageCommand (program) {
  program
    .command('save')
    .alias('s')
    .description('Saves the ubiquitous language entities as files')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output [output]', 'Output folder for source files', 'domain')
    .option('-t, --translator [translator]', 'Language translator (log|ubi|site)', 'log')
    .action(WriteUbiquitousLanguage.bind({ target }))
}

module.exports = SaveUbiquitousLanguageCommand
