const ParseDomainFilesFromPattern = require('../Domain/UseCases/ParseDomainFilesFromPattern')

function ParseDomainFilesFromPatternCommand (program) {
  program
    .command('glob')
    .alias('g')
    .description('Parses domain files using a glob pattern')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output [output]', 'Output folder for source files', 'domain')
    .action(ParseDomainFilesFromPattern)
}

module.exports = ParseDomainFilesFromPatternCommand
