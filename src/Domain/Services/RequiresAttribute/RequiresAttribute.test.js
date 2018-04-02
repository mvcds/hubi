const assert = require('assert')

const RequiresAttribute = require('./')

describe('RequiresAttribute Service', () => {
  it('Throws when no attribute is provided', () => {
    assert.throws(RequiresAttribute, 'The attribute "attribute" is required')
  })
})
