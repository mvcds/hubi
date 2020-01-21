const assert = require('assert')

const loadsTokens = require('./')

async function test () {
  return loadsTokens(this)
}

async function rejects (attempt, error) {
  try {
    await attempt()
    assert.fail('Should have failed')
  } catch (e) {
    assert.deepEqual(e, error)
  }
}

describe('LoadsTokens Service', () => {
  context('Unique tokens', () => {
    it('Returns all tokens', async () => {
      const globPattern = `${__dirname}/fixture/ppg.*.fixture`

      const tokens = await loadsTokens({ globPattern })

      assert.equal(tokens.length, 3)
    })
  })

  context('Tokens with same name', () => {
    it('Throws a name error', async () => {
      const fail = test.bind({
        globPattern: `${__dirname}/fixture/*.blossom.fixture`
      })

      await rejects(fail, ['There are 2 tokens named as "blossom"'])
    })
  })

  context('Tokens with same alias', () => {
    it('Throws an alias error', async () => {
      const fail = test.bind({
        globPattern: `${__dirname}/fixture/steven.*.fixture`
      })

      await rejects(fail, ['There are 3 tokens aliased as "best-gem"'])
    })
  })

  context('Token with alias equal to another token\'s name', () => {
    it('Throws a name-alias error', async () => {
      const fail = test.bind({
        globPattern: `${__dirname}/fixture/+(br-pt.little-flower|ppg.blossom).fixture`
      })

      await rejects(fail, ['There is a token named "florzinha" but "blossom" uses it as an alias'])
    })
  })
})
