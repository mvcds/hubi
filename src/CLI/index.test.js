const { mock } = require('sinon')

const cli = require('./index')

describe('CLI', () => {
  const injection = {
    path: {
      dirname: mock('path.dirname'),
      basename: mock('path.basename'),
      join: mock('path.join')
    },
    fs: {
      readdirSync: mock('fs.readdirSync')
    },
    require: mock('require')
  }

  const command = mock('command')

  const dir = '/you/directory'
  const index = 'index'
  const other = 'other'
  const program = 'program'

  const cliFile = `${dir}/${index}.js`
  const commandFile = `${dir}/other.js`

  const files = [ index, other ].reduce((files, file) => [
    ...files,
    `${file}.js`,
    `${file}.test.js`,
    `${file}.yml`
  ], [])

  before(() => {
    injection.path.dirname
      .withExactArgs(cliFile)
      .returns(dir)
    injection.path.basename
      .withExactArgs(cliFile)
      .returns(`${index}.js`)
    injection.path.join
      .withExactArgs(dir, `${other}.js`)
      .returns(commandFile)
    injection.fs.readdirSync
      .withExactArgs(dir)
      .returns(files)
    injection.require
      .withExactArgs(commandFile)
      .returns(command)

    command.withExactArgs(program)
  })

  it('Uses CLI', () => cli(program, { ...injection, cliFile }))

  it('Gets the CLI file\'s directory', () => injection.path.dirname.verify())

  it('Gets the CLI file\'s basename', () => injection.path.basename.verify())

  it('Reads the CLI directory', () => injection.fs.readdirSync.verify())

  it('Gets the path to the file', () => injection.path.join.verify())

  it('Requires the expected file', () => injection.require.verify())

  it('Installs the command', () => command.verify())
})
