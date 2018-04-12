const assert = require('assert')
const { lorem } = require('faker')

const parser = require('./')
const AttributeFactory = require('./Attribute.factory')

const testType = (data, expectation) => {
  const value = parser(data)

  assert.equal(value.type, expectation)

  return value
}

describe('AttributeParser', () => {
  context('String', () => {
    it('Parsers a string to string attribute', () => testType(lorem.word(), 'string'))

    it('Parsers implicity object to string attribute', () => testType(AttributeFactory.TypelessObject(), 'string'))

    it('Parsers string value to string', () => testType(AttributeFactory.String(), 'string'))
  })

  context('Boolean', () => {
    it('Parsers bool value to boolean attribute', () => testType(AttributeFactory.Bool(), 'boolean'))

    it('Parsers boolean value to boolean attribute', () => testType(AttributeFactory.Boolean(), 'boolean'))
  })

  context('Date', () => {
    it('Parsers date value to date attribute', () => testType(AttributeFactory.Date(), 'date'))
  })

  context('Float', () => {
    it('Parsers decimal value to float attribute', () => testType(AttributeFactory.Decimal(), 'float'))

    it('Parsers float value to float attribute', () => testType(AttributeFactory.Float(), 'float'))

    it('Parsers number value to float attribute', () => testType(AttributeFactory.Number(), 'float'))
  })

  context('Integer', () => {
    it('Parsers int value to integer attribute', () => testType(AttributeFactory.Int(), 'integer'))

    it('Parsers integer value to integer attribute', () => testType(AttributeFactory.Integer(), 'integer'))
  })

  context('JSON', () => {
    it('Parsers JSON value to JSON attribute', () => testType(AttributeFactory.JSON(), 'json'))
  })

  context('Object', () => {
    it('Parsers object value to object attribute', () => testType(AttributeFactory.Object(), 'object'))

    it('Parsers shape value to object attribute', () => testType(AttributeFactory.Shape(), 'object'))
  })

  context('Token', () => {
    it('Parsers tokens value to its name', () => {
      const objectName = lorem.word()

      testType(AttributeFactory.Token(objectName), objectName)
    })
  })

  context('Array', () => {
    it('Parsers array value to array attribute', () => testType(AttributeFactory.Array(), 'array'))

    it('Parsers object value to the array attibute', () => {
      const objectName = lorem.word()

      const attribute = testType(AttributeFactory.Array(objectName), 'array')

      assert.equal(attribute.of, objectName, `${attribute}`)
    })
  })
})
