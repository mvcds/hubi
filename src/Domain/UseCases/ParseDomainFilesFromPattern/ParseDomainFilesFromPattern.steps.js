const fs = require('fs')
const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')

const FILE_RESULT = fs.readFileSync(`${__dirname}/fixture/file.result.fixture`, 'utf8')
const file = `${__dirname}/fixture/file.fixture`

const ParseDomainFilesFromPattern = require('./')

Given('some glob pattern', function () {
  this.args = Object.assign({}, this.args, { pattern: 'pattern' })
})

Given('some output folder', function () {
  this.args = Object.assign({}, this.args, { output: 'output' })
})

Given('translator is log', function () {
  this.args = Object.assign({}, this.args, { translator: 'log' })
})

When('I run ParseDomainFilesFromPattern', function () {
  this.injection = Object.assign({}, this.injection, {
    glob: {
      sync: mock('glob.sync')
    },
    write: mock('write')
  })

  this.injection.glob.sync
    .withExactArgs(this.args.pattern)
    .returns([ file ])

  this.injection.write
    .withExactArgs([ match.string ])

  return ParseDomainFilesFromPattern(this.args, this.injection)
})

Then('the glob pattern find a domain file', function () {
  this.injection.glob.sync.verify()
})

Then('an ubiquitous entity is created', function () {
  this.injection.write.verify()

  const [ [ result ] ] = this.injection.write.args

  const entity = JSON.parse(FILE_RESULT)
  const expectation = JSON.parse(result)

  assert.deepEqual(entity, expectation)
})
