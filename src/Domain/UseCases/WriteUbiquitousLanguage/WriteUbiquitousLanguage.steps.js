const assert = require('assert')
const fs = require('fs')
const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')
const { lorem } = require('faker')

const WriteUbiquitousLanguage = require('./')

Given('the {string} translator', function (translator) {
  this.args = Object.assign({}, this.args, { translator })
})

Given('a pattern', function () {
  this.args = Object.assign({}, this.args, {
    pattern: `${__dirname}/fixture/file.fixture`
  })
})

Given('some output', function () {
  this.args = Object.assign({}, this.args, {
    output: lorem.word()
  })
})

Given('set target function', function () {
  this.aux = Object.assign({}, this.aux, {
    target: mock('target')
  })
})

Given('set write dependency', function () {
  this.injection = Object.assign({}, this.injection, {
    write: lorem.word()
  })
})

When('I call WriteUbiquitousLanguage', async function () {
  const { target } = this.aux

  target.withExactArgs(match.object)

  this.result = await WriteUbiquitousLanguage.call({ target }, this.args, this.injection)
})

Then('the translation is written', function () {
  this.aux.target.verify()
})

Then('translation was precise', function () {
  const filePath = `${__dirname}/fixture/file.${this.args.translator}.fixture`

  const [ [ { entity } ] ] = this.aux.target.args
  const expectation = fs.readFileSync(filePath, 'utf8')

  assert.equal(entity, expectation.trim())
})

Then('write was invoked', function () {
  const [ [ { write } ] ] = this.aux.target.args

  assert.equal(write, this.injection.write)
})

Then('a filePath was provided', function () {
  const [ [ { filePath } ] ] = this.aux.target.args

  const expectation = `${this.args.output}/file`

  assert.ok(filePath.includes(expectation))
})
