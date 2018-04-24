const { lorem } = require('faker')
const { mock } = require('sinon')

const LogUbiquitousLanguageIntoConsole = require('./')

const test = () => {
  return {
    log: mock('log'),
    UsesTranslator: mock('UsesTranslator'),
    TranslateFiles: mock('TranslateFiles')
  }
}

describe('LogUbiquitousLanguageIntoConsole', () => {
  const { UsesTranslator, TranslateFiles, log } = test()

  before(async () => {
    const pattern = lorem.word()
    const translator = lorem.word()
    const object = lorem.word()

    const translation = [ { object } ]

    log.withExactArgs(object)

    UsesTranslator.withExactArgs({ translatorName: translator })
      .returns(translator)

    TranslateFiles.withExactArgs({ pattern, translator })
      .resolves(translation)

    await LogUbiquitousLanguageIntoConsole({ pattern, translator }, {
      log,
      UsesTranslator,
      TranslateFiles
    })
  })

  it('Uses the correct translator', () => UsesTranslator.verify())

  it('Writes the translation', () => TranslateFiles.verify())

  it('Logs the object', () => log.verify())
})
