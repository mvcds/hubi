const assert = require('assert')
const { lorem } = require('faker')

const Entity = require('./')

describe('Entity', () => {
  context('Without name', () => {
    it('Throws on nameless', () => {
      const test = () => Entity({ description: lorem.word(), attributes: [] })

      assert.throws(test, /The attribute "name" is required$/)
    })
  })

  context('Without description', () => {
    it('Throws on descriptionless', () => {
      const test = () => Entity({ name: lorem.word(), attributes: [] })

      assert.throws(test, /The attribute "description" is required$/)
    })
  })

  context('Without attributes', () => {
    it('Throws on attributeless', () => {
      const test = () => Entity({ name: lorem.word(), description: lorem.word() })

      assert.throws(test, /The attribute "attributes" is required$/)
    })
  })
})
