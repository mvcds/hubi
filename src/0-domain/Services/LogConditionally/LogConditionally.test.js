const { mock } = require('sinon')
const { lorem } = require('faker')

const LogConditionally = require('./')

describe('LogConditionally Service', () => {
  context('Logs based on flag', () => {
    it('Prints the message', () => {
      const print = mock('print')
      const message = lorem.sentence()

      print.withExactArgs(message)

      LogConditionally({ canLog: true, print })

      LogConditionally.log(message)

      print.verify()
    })

    it('Does not print the message', () => {
      const print = mock('print')
      const message = lorem.sentence()

      print.never()

      LogConditionally({ canLog: false, print })

      LogConditionally.log(message)

      print.verify()
    })
  })

  context('Logs based on environment', () => {
    it('Prints the message', () => {
      const print = mock('print')
      const message = lorem.sentence()

      print.withExactArgs(message)

      LogConditionally({ print })

      LogConditionally.env(message, process.env.NODE_ENV)

      print.verify()
    })

    it('Does not print the message', () => {
      const print = mock('print')
      const message = lorem.sentence()

      print.never()

      LogConditionally({ print })

      LogConditionally.env(message, message)

      print.verify()
    })
  })
})
