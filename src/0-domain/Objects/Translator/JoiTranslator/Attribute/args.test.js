const assert = require('assert')

const Arguments = require('./args')

const { withArguments } = require('./args.factory')

const testArguments = (args, expectation) => {
  assert.equal(Arguments(args), expectation)
}

describe('Joi Arguments', () => {
  context('With some optional arguments', () => {
    it('Does not have any arity at all', () => {
      const required = 3
      const optional = 2

      const result = withArguments({ required, optional })

      testArguments(result, `.minArity(${required}).maxArity(${required + optional})`)
    })
  })
})
