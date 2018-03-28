const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')

const ParseDomainFilesFromPattern = require('./')

Given('some glob pattern', function () {
  this.args = Object.assign({}, this.args, { pattern: 'pattern' })
})

Given('some output folder', function () {
  this.args = Object.assign({}, this.args, { output: 'output' })
})

When('I run ParseDomainFilesFromPattern', function () {
  this.injection = Object.assign({}, this.injection, {
    glob: {
      sync: mock('glob.sync')
    },
    fs: {
      readFileSync: mock('fs.readFileSync')
    },
    yaml: {
      safeLoad: mock('yaml.safeLoad')
    },
    write: mock('write')
  })

  this.injection.glob.sync
    .withExactArgs(this.args.pattern)
    .returns([ 'file' ])

  this.injection.fs.readFileSync
    .withExactArgs('file', match.object)
    .returns('content')

  this.injection.yaml.safeLoad
    .withExactArgs('content')
    .returns({
      name: 'bar',
      description: 'desc',
      attributes: [ 'foo' ]
    })

  this.injection.write
    .withExactArgs(`${this.args.output}/bar.ubi.js`, match.string)

  return ParseDomainFilesFromPattern(this.args, this.injection)
})

Then('the glob pattern find a domain file', function () {
  this.injection.glob.sync.verify()
})

Then('the domain file is read', function () {
  this.injection.fs.readFileSync.verify()
})

Then('the domain file is converted into a source file', function () {
  this.injection.yaml.safeLoad.verify()
})

Then('the source file is saved on output folder', function () {
  this.injection.write.verify()
})
