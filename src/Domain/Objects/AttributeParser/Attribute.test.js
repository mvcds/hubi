const assert = require('assert')

const Attribute = require('./Attribute')

describe('Attribute', () => {
  context('Without name', () => {
    it('Throws on nameless', () => {
      const test = () => Attribute({ type: 'foo' })

      assert.throws(test, /The attribute "name" is required$/)
    })
  })

  context('Without type', () => {
    it('Throws on typeless', () => {
      const test = () => Attribute({ name: 'foo' })

      assert.throws(test, /The attribute "type" is required$/)
    })
  })
})
