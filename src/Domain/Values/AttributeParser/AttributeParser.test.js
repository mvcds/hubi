const { mock } = require('sinon')

const AttributeParser = require('./')

describe('AttributeParser', () => {
  context('Typeless attribute', () => {
    const attributeType = mock('attributeType')
    const attribute = 'foo'

    it('Parses the attribute', () => {
      const injection = {
        attributes: [ attributeType ]
      }

      attributeType.isMatch = mock('attributeType.isMatch')
        .withExactArgs(undefined)
        .returns(attributeType)

      AttributeParser(attribute, injection)
    })

    it('Verifies as string', () => attributeType.isMatch.verify())

    it('Creates the attribute', () => attributeType.verify())
  })

  context('Typed attribute', () => {
    const attributeType = mock('attributeType')
    const attribute = { name: 'foo', type: 'bar' }

    it('Parses the attribute', () => {
      const injection = {
        attributes: [ attributeType ]
      }

      attributeType.isMatch = mock('attributeType.isMatch')
        .withExactArgs(attribute.type)
        .returns(attributeType)

      AttributeParser(attribute, injection)
    })

    it('Verifies the type', () => attributeType.isMatch.verify())

    it('Creates the attribute', () => attributeType.verify())
  })
})
