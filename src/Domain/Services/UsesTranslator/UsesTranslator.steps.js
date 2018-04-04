const assert = require('assert')
const fs = require('fs')
const { Given, When, Then } = require('cucumber')

const UbiquitousLanguage = require('../../Objects/UbiquitousLanguage')

const UsesTranslator = require('./')

const FILE = JSON.parse(
  fs.readFileSync(`${__dirname}/fixture/file.fixture`, 'utf8')
)

function fix (fixture) {
  if (typeof fixture === 'object') return JSON.stringify(fixture, null, 2).trim()

  return fixture.trim()
}

Given('the {string} translator', function (translatorName) {
  this.args = Object.assign({}, this.args, { translatorName })
})

When('I call UsesTranslator', function () {
  const ubiquitousLanguage = new UbiquitousLanguage({
    entities: [ FILE ]
  })

  this.args = Object.assign({}, this.args, { ubiquitousLanguage })

  this.result = UsesTranslator(this.args)
})

Then('translation yield expected file', function () {
  const filePath = `${__dirname}/fixture/file.${this.args.translatorName}.fixture`

  const expectation = fs.readFileSync(filePath, 'utf8')
  const [ result ] = this.result.translate()

  assert.equal(fix(result), fix(expectation))
})
