const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function target ({ object, write, filePath }) {
  write(filePath, object)
}

function SaveUbiquitousLanguageCommand (program) {
  program
    .command('save')
    .alias('s')
    .description('Saves the ubiquitous language objects as files')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output [output]', 'Output folder for source files', 'domain')
    .option('-t, --translator [translator]', 'Language translator (log|ubi|site)', 'log')
    .action(WriteUbiquitousLanguage.bind({ target }))
}

module.exports = SaveUbiquitousLanguageCommand
