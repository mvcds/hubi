const assert = require('assert')

const UsesTranslator = require('./')

describe('UsesTranslator Service', () => {
  it('Does not use a knwon translator name', () => {
    const fail = () => UsesTranslator({
      translatorName: 'an-unkwon-translator',
      ubiquitousLanguage: {}
    })

    assert.throws(fail, /It is not possible to use "an-unkwon-translator" as a translator yet/)
  })
})
