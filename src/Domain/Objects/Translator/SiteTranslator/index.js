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

function interpretToken (token) {
  return token
}

async function handleTranslation ({ translation: tokens, action }) {
  const file = `${__dirname}/site.pug`

  const html = pug.renderFile(file, { tokens })

  action({
    name: 'hubi',
    object: await formatHTML(html, TIDY)
  })
}

function nameFile ({ name }) {
  return `${name}.hubi.html`
}

function SiteTranslator (data) {
  Object.assign(this, new Translator({
    ...data,
    interpretToken,
    handleTranslation,
    nameFile
  }))
}

module.exports = SiteTranslator
