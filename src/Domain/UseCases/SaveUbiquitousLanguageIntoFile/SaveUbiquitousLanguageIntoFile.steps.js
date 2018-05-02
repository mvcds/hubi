const assert = require('assert')
const fs = require('fs')
const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')
const { lorem } = require('faker')

const SaveUbiquitousLanguageIntoFile = require('./')

const PATTERN = `${__dirname}/fixture/file.fixture`

Given('the {string} translator', function (translator) {
  this.args = Object.assign({}, this.args, { translator })
})

Given('a pattern', function () {
  this.args = Object.assign({}, this.args, { pattern: PATTERN })
})

Given('some output', function () {
  this.args = Object.assign({}, this.args, {
    output: lorem.word()
  })
})

Given('set write dependency', function () {
  this.injection = Object.assign({}, this.injection, {
    write: mock('write')
  })
})

Given('the same folder flag', function () {
  this.args = Object.assign({}, this.args, { sameFolder: true })
})

When('I call SaveUbiquitousLanguageIntoFile', async function () {
  this.injection.write
    .withExactArgs(match.string, match.string)

  try {
    this.result = await SaveUbiquitousLanguageIntoFile(this.args, this.injection)
  } catch (e) {
    this.result = e
  }
})

Then('the translation is written', function () {
  this.injection.write.verify()
})

Then('translation was precise', function () {
  const filePath = `${__dirname}/fixture/file.${this.args.translator}.fixture`

  const [ [ , object ] ] = this.injection.write.args
  const expectation = fs.readFileSync(filePath, 'utf8')

  assert.equal(object.trim(), expectation.trim())
})

Then('an error {string} happens', function (error) {
  assert.equal(this.result.message, error)
})
