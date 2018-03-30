const ParseDomainFilesFromPattern = require('../Domain/UseCases/ParseDomainFilesFromPattern')

function ParseDomainFilesFromPatternCommand (program) {
  program
    .command('glob')
    .alias('g')
    .description('Parses domain files using a glob pattern')
    .option('-p, --pattern [pattern]', 'Glob pattern pointing to domain files', 'src/**/*.yml')
    .option('-o, --output [output]', 'Output folder for source files', 'domain')
    .option('-n, --parser-name [parserName]', 'Parse\'s name (log|ubi)', 'log')
    .action(ParseDomainFilesFromPattern)
}

module.exports = ParseDomainFilesFromPatternCommand
