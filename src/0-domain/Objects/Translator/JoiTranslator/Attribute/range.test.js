const assert = require('assert')

const Range = require('./range')

const { number, limitless, encodeless, complete } = require('./range.factory')

const testRange = (range, expectation) => {
  assert.equal(Range(range), expectation)
}

describe('Joi Range', () => {
  context('Number', () => {
    it('Creates a range with the number', () => {
      const range = number()

      testRange(range, `.${range.kind}(${range.data})`)
    })
  })

  context('Limitless object', () => {
    it('Throws about limit', () => {
      const range = limitless('some name')

      assert.throws(() => Range(range), /No limit for range "some name"/)
    })
  })

  context('Encodingless object', () => {
    it('Does not add encode', () => {
      const range = encodeless()

      testRange(range, `.${range.kind}(${range.data.limit})`)
    })
  })

  context('Complete object', () => {
    it('Adds encode to the range', () => {
      const range = complete()

      testRange(range, `.${range.kind}(${range.data.limit}, ${range.data.encode})`)
    })
  })
})
