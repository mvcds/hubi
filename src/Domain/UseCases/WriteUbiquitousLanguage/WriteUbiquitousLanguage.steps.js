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

Given('set writer', function () {
  this.aux = Object.assign({}, this.aux, {
    writer: mock('writer')
  })
})

Given('a pen', function () {
  this.injection = Object.assign({}, this.injection, {
    pen: lorem.word()
  })
})

When('I call WriteUbiquitousLanguage', async function () {
  const { writer } = this.aux

  writer.withExactArgs(match.object)

  this.result = await WriteUbiquitousLanguage.call({ writer }, this.args, this.injection)
})

Then('writter is invoked', function () {
  this.aux.writer.verify()
})

Then('translation was precise', function () {
  const filePath = `${__dirname}/fixture/file.${this.args.translator}.fixture`

  const [ [ { entity } ] ] = this.aux.writer.args
  const expectation = fs.readFileSync(filePath, 'utf8')

  assert.equal(entity, expectation.trim())
})

Then('pen was used', function () {
  const [ [ { pen } ] ] = this.aux.writer.args

  assert.equal(pen, this.injection.pen)
})

Then('a filePath was provided', function () {
  const [ [ { filePath } ] ] = this.aux.writer.args

  const expectation = `${this.args.output}/file`

  assert.ok(filePath.includes(expectation))
})
