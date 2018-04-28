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

const FILE = `${__dirname}/site.pug`

function interpretToken (token) {
  return token
}

function getTranslation ({ token }) {
  return {
    name: token.name,
    object: token
  }
}

async function createLexicon ({ translation }) {
  const tokens = Array.from(translation.values())
    .map(getTranslation)

  const html = pug.renderFile(FILE, { tokens })

  const translated = await formatHTML(html, TIDY)

  return new Map().set('site', { translated })
}

function nameFile () {
  return 'index.hubi.html'
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
