const path = require('path')
const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')

const ParseDomainFileIntoSourceFile = require('./')

const DIRECTORY = path.dirname(__filename)

Given('{string} file', function (fixtureName) {
  const domain = `${DIRECTORY}/fixtures/${fixtureName}`

  this.args = Object.assign({}, this.args, { domain })
})

Given('translator is ubi', function () {
  this.args = Object.assign({}, this.args, { translator: 'ubi' })
})

When('I run ParseDomainFileIntoSourceFile', async function () {
  this.injection = Object.assign({}, this.injection, {
    write: mock('write')
  })

  this.injection.write
    .withExactArgs(match.string, match.string)

  return ParseDomainFileIntoSourceFile(this.args, this.injection)
})

Then('the atribute has type {string}', function (type) {
  const [ [, result] ] = this.injection.write.args

  const expectation = `'attribute': '${type}'`

  assert.ok(result.includes(expectation), result)
})
