const pug = require('pug')
const { tidy } = require('htmltidy')
const { promisify } = require('util')

const formatHTML = promisify(tidy)

const Translator = require('../')

const TIDY = {
  doctype: 'html5',
  hideComments: false,
  indent: true
}

function applyEntityTemplate (schema) {
  const asString = JSON.stringify(schema, null, '  ')

  return `const SCHEMA = ${asString}

module.exports = SCHEMA
`
}

function addAttribute (schema, attribute) {
  return {
    ...schema,
    ...UbiTranslator.parse(attribute)
  }
}

function translateEntity (entity) {
  const schema = entity.attributes
    .reduce(addAttribute, {})

  const content = applyEntityTemplate(schema)

  return content.replace(/"/g, "'")
}

async function handleTranslation ({ translation, action }) {
  const file = `${__dirname}/site.pug`

  const html = pug.renderFile(file, {})

  action({
    name: 'hubi',
    entity: await formatHTML(html, TIDY)
  })
}

function UbiTranslator (data) {
  Object.assign(this, new Translator({ ...data, translateEntity, handleTranslation }))
}

UbiTranslator.parse = function (attribute) {
  const { isRequired, type, name, of: arrayOf } = attribute

  const wrapped = arrayOf ? `[${arrayOf}]` : type

  const attr = `${wrapped}${isRequired ? '.required' : ''}`

  return { [name]: attr }
}

module.exports = UbiTranslator
