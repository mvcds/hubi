const assert = require('assert')
const fs = require('fs')
const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')

const ParseDomainFileIntoSourceFile = require('./')

Given('{string} file', function (fixtureName) {
  this.aux = Object.assign({}, this.aux, { fixtureName })
})

Given('translator is ubi', function () {
  this.args = Object.assign({}, this.args, { translator: 'ubi' })
})

When('I run ParseDomainFileIntoSourceFile', async function () {
  const args = {
    ...this.args,
    domain: `${__dirname}/fixtures/${this.aux.fixtureName}.fixture`
  }

  this.injection = Object.assign({}, this.injection, {
    write: mock('write')
  })

  this.injection.write
    .withExactArgs(match.array)

  return ParseDomainFileIntoSourceFile(args, this.injection)
})

Then('the atribute has type {string}', function (type) {
  const [ [ [ result ] ] ] = this.injection.write.args
  const filename = `${__dirname}/fixtures/${this.aux.fixtureName}.result.fixture`

  const expected = fs.readFileSync(filename, 'utf8')

  assert.equal(result, expected)
})
