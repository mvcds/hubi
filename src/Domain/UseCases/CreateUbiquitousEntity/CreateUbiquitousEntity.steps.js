const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { mock, match } = require('sinon')

const AttributeFactory = require('../../Objects/AttributeParser/Attribute.factory')

const CreateUbiquitousEntity = require('./')

Given('the path to a file', function () {
  this.args = Object.assign({}, this.args, {
    filePath: 'file'
  })
})

When('I run CreateUbiquitousEntity', async function () {
  const attribute = AttributeFactory.String({ name: 'foo' })

  const object = {
    name: 'bar',
    description: 'desc',
    attributes: [ attribute ]
  }

  this.injection = Object.assign({}, this.injection, {
    fs: {
      readFileSync: mock('fs.readFileSync')
    },
    yaml: {
      safeLoad: mock('yaml.safeLoad')
    }
  })

  this.injection.fs.readFileSync
    .withExactArgs('file', match.object)
    .returns('content')

  this.injection.yaml.safeLoad
    .withExactArgs('content')
    .returns(object)

  this.result = await CreateUbiquitousEntity(this.args, this.injection)
})

Then('the file is read', function () {
  this.injection.fs.readFileSync.verify()
})

Then('the file is loaded', function () {
  this.injection.yaml.safeLoad.verify()
})

Then('the entity is created', function () {
  assert.equal(this.result.name, 'bar')
  assert.equal(this.result.attributes[0].name, 'foo')
  assert.equal(this.result.attributes[0].type, 'string')
})
