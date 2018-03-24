const ParseFiles = require('../Domain/UseCases/ParseFiles')

function ParseCommand (program) {
  program
    .command('parse')
    .alias('p')
    .description('Parses domain files into source files')
    .option('-p, --pattern <pattern>', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output <output>', 'Output folder for source files', 'domain')
    .action(ParseFiles)
}

module.exports = ParseCommand
