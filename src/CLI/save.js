const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function writer ({ entity, pen, filePath }) {
  pen(filePath, entity)
}

function SaveUbiquitousLanguageCommand (program) {
  program
    .command('save')
    .alias('s')
    .description('Saves the ubiquitous language entities as files')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output [output]', 'Output folder for source files', 'domain')
    .option('-t, --translator [translator]', 'Language translator (log|ubi)', 'log')
    .action(WriteUbiquitousLanguage.bind({ writer }))
}

module.exports = SaveUbiquitousLanguageCommand
