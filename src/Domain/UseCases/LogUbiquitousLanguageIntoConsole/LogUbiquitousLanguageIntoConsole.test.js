const { lorem } = require('faker')
const { mock, match } = require('sinon')

const LogUbiquitousLanguageIntoConsole = require('./')

const TOKEN = { isAbstract: true }

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
    const translator = { ignoreAbstract: true }
    const translated = lorem.word()

    const translation = {
      forEachLexiconItem: mock('forEachLexiconItem')
        .withExactArgs(match.func, { log, translator })
        .callsArgOnWith(0, { log, translator }, { translated, token: TOKEN })
    }

    log.withExactArgs(translated)

    UsesTranslator.withExactArgs({ translatorName: translator })
      .returns(translator)

    TranslateFiles.withExactArgs({ pattern, translator })
      .resolves(translation)

    return LogUbiquitousLanguageIntoConsole({ pattern, translator }, {
      log,
      UsesTranslator,
      TranslateFiles
    })
  })

  it('Uses the correct translator', () => UsesTranslator.verify())

  it('Writes the translation', () => TranslateFiles.verify())

  it('Logs the translated object', () => log.verify())
})
