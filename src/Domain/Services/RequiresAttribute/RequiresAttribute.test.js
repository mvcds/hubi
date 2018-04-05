const assert = require('assert')
const { lorem } = require('faker')

const RequiresAttribute = require('./')

function test () {
  RequiresAttribute(this, {
    word: 'my word',
    attribute: 'attribute',
    foo: 'foo'
  })
}

describe('RequiresAttribute Service', () => {
  context('Failure to fulfill requirement', () => {
    it('Has an undefined value', () => {
      const fail = test.bind({
        word: undefined,
        attribute: null
      })

      assert.throws(fail, /The attribute "my word" is required/)
    })

    it('Has a null value', () => {
      const fail = test.bind({
        word: lorem.word(),
        attribute: null
      })

      assert.throws(fail, /The attribute "attribute" is required/)
    })

    it('Does not provide a value', () => {
      const fail = test.bind({
        word: lorem.word(),
        attribute: lorem.word()
      })

      assert.throws(fail, /The attribute "foo" is required/)
    })
  })

  context('Invalid usage', () => {
    it('Has no data', () => {
      assert.throws(RequiresAttribute, /The attribute "data" is required/)
    })

    it('Has no requirements', () => {
      assert.throws(() => RequiresAttribute(true), /The attribute "requirements" is required/)
    })
  })
})
