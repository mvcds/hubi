const { mock } = require('sinon')
const { lorem } = require('faker')

const LogConditionally = require('./')

describe('LogConditionally Service', () => {
  const print = mock('print')

  before(() => {
    const message = lorem.sentence()
    print.withExactArgs(message)

    LogConditionally({ canLog: true, print })

    LogConditionally.log(message)
  })

  it('Prints the message', () => {
    print.verify()
  })
})
