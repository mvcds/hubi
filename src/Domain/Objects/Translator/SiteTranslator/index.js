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

function translateEntity (entity) {
  return entity
}

async function handleTranslation ({ translation: tokens, action }) {
  const file = `${__dirname}/site.pug`

  const html = pug.renderFile(file, { tokens })

  action({
    name: 'hubi',
    entity: await formatHTML(html, TIDY)
  })
}

function SiteTranslator (data) {
  Object.assign(this, new Translator({ ...data, translateEntity, handleTranslation }))
}

module.exports = SiteTranslator
