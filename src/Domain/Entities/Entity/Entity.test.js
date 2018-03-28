const assert = require('assert')

const Entity = require('./')

describe('Entity', () => {
  context('Without name', () => {
    it('Throws on nameless', () => {
      const test = () => Entity({ description: 'foo', attributes: [] })

      assert.throws(test, /The attribute "name" is required$/)
    })
  })

  context('Without description', () => {
    it('Throws on descriptionless', () => {
      const test = () => Entity({ name: 'foo', attributes: [] })

      assert.throws(test, /The attribute "description" is required$/)
    })
  })

  context('Without attributes', () => {
    it('Throws on attributeless', () => {
      const test = () => Entity({ name: 'foo', description: 'foo' })

      assert.throws(test, /The attribute "attributes" is required$/)
    })
  })
})
