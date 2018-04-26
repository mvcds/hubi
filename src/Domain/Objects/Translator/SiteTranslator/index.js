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

async function createLexicon ({ interpretation: tokens }) {
  const file = `${__dirname}/site.pug`

  const html = pug.renderFile(file, { tokens })

  const object = await formatHTML(html, TIDY)

  return { name: 'index', object }
}

function nameFile ({ name }) {
  return `${name}.hubi.html`
}

function SiteTranslator (data) {
  Object.assign(this, new Translator({
    ...data,
    interpretToken,
    createLexicon,
    nameFile
  }))
}

module.exports = SiteTranslator
