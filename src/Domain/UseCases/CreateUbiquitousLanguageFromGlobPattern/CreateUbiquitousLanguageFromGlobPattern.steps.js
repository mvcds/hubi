const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { mock } = require('sinon')
const { lorem } = require('faker')

const CreateUbiquitousLanguageFromGlobPattern = require('./')

Given('a pattern to {string}', function (file) {
  const { aux = { files: [] } } = this

  const newFile = `${__dirname}/fixture/${file}.fixture`

  this.aux = Object.assign({}, this.aux, {
    files: [ ...aux.files, newFile ]
  })
})

When('I run CreateUbiquitousLanguageFromGlobPattern', async function () {
  const globPattern = lorem.word()

  this.injection = Object.assign({}, this.injection, {
    glob: {
      sync: mock('glob.sync')
    }
  })

  this.injection.glob.sync
    .withExactArgs(globPattern)
    .returns(this.aux.files)

  this.result = await CreateUbiquitousLanguageFromGlobPattern({ globPattern }, this.injection)
})

Then('the glob pattern is read', function () {
  this.injection.glob.sync.verify()
})

Then('the entity {string} has {int} dependencies', function (entityName, expectation) {
  const dependencies = this.result.dependenciesOf(entityName)

  assert.equal(dependencies.length, expectation)
})
