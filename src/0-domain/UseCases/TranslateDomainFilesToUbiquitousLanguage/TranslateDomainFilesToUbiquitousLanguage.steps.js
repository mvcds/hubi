const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { mock } = require('sinon')
const { lorem } = require('faker')

const UsesTranslator = require('../../Services/UsesTranslator')

const TranslateDomainFilesToUbiquitousLanguage = require('./')

const TRANSLATOR = UsesTranslator({ translatorName: 'log' })

Given('a pattern to {string}', function (file) {
  const { aux = { files: [] } } = this

  const newFile = `${__dirname}/fixture/${file}.fixture`

  this.aux = Object.assign({}, this.aux, {
    files: [ ...aux.files, newFile ]
  })
})

When('I run TranslateDomainFilesToUbiquitousLanguage', async function () {
  const globPattern = lorem.word()

  this.injection = Object.assign({}, this.injection, {
    glob: {
      sync: mock('glob.sync')
    }
  })

  this.injection.glob.sync
    .withExactArgs(globPattern)
    .returns(this.aux.files)

  this.result = await TranslateDomainFilesToUbiquitousLanguage({
    pattern: globPattern,
    translator: TRANSLATOR
  }, this.injection)
})

Then('the glob pattern is read', function () {
  this.injection.glob.sync.verify()
})

Then('the token {string} has {int} dependencies', function (token, expectation) {
  const dependencies = this.result.dependenciesOf(token)

  assert.equal(dependencies.length, expectation)
})

Then('the token {string} has {int} dependents', function (token, expectation) {
  const dependents = this.result.dependentsOf(token)

  assert.equal(dependents.length, expectation)
})
