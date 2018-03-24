const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')

const ParseFiles = require('./')

Given('some glob pattern', function () {
  this.args = Object.assign({}, this.args, { pattern: 'pattern' })
})

Given('some output folder', function () {
  this.args = Object.assign({}, this.args, { output: 'output' })
})

When('I run ParseFiles', function () {
  this.injection = Object.assign({}, this.injection, {
    glob: mock('glob'),
    fs: {
      readFile: mock('fs.readFile')
    },
    yaml: {
      safeLoad: mock('yaml.safeLoad')
    },
    write: mock('write')
  })

  this.injection.glob
    .withExactArgs(this.args.pattern, match.func)
    .callsArgWith(1, null, [ 'file' ])

  this.injection.fs.readFile
    .withExactArgs('file', 'utf8', match.func)
    .callsArgWith(2, null, 'content')

  this.injection.yaml.safeLoad
    .withExactArgs('content')
    .returns({ name: 'name' })

  this.injection.write
    .withExactArgs(`${this.args.output}/name.json`, match.string)

  return ParseFiles(this.args, this.injection)
})

Then('the glob pattern find a domain file', function () {
  this.injection.glob.verify()
})

Then('the domain file is read', function () {
  this.injection.fs.readFile.verify()
})

Then('the domain file is converted into a source file', function () {
  this.injection.yaml.safeLoad.verify()
})

Then('the source file is saved on output folder', function () {
  this.injection.write.verify()
})
