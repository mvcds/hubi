const ParseDomainFileIntoSourceFile = require('../Domain/UseCases/ParseDomainFileIntoSourceFile')

function ParseDomainFileIntoSourceFileCommand (program) {
  program
    .command('parse')
    .alias('p')
    .description('Parses a domain files into source file')
    .option('-d, --domain [domain]', 'Path to the domain file')
    .option('-t, --translator [translator]', 'Language translator (log|ubi)', 'log')
    .action(ParseDomainFileIntoSourceFile)
}

module.exports = ParseDomainFileIntoSourceFileCommand
