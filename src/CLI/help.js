const colors = require('colors')

const { name } = require('../../package.json')

function UnkownCommands (program) {
  program
    .action(() => {
      const help = `Cannot run '${colors.red(name, program.args[0])}' try '${colors.green(`${name} --help`)}' to get the following help`

      console.log(help)
      program.help()
    })
}

module.exports = UnkownCommands
