const WriteUbiquitousLanguage = require('../Domain/UseCases/WriteUbiquitousLanguage')

function write (entity, index) {
  //  TODO: language gives the filePath
  const filePath = `${process.env.PWD}/${this.output}/${index}.ubi.js`

  //  TODO: this decision does not belong here
  const value = typeof entity === 'string' ? entity : JSON.stringify(entity, null, 2)

  this.write(filePath, value)
}

function SaveUbiquitousLanguageCommand (program) {
  program
    .command('save')
    .alias('s')
    .description('Saves the ubiquitous language entities as files')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output [output]', 'Output folder for source files', 'domain')
    .option('-t, --translator [translator]', 'Language translator (log|ubi)', 'log')
    .action(WriteUbiquitousLanguage.bind({ write }))
}

module.exports = SaveUbiquitousLanguageCommand
