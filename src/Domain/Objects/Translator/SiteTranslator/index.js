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
const NAME = 'index.hubi.html'

const TOKEN = {
  filePath: `${process.env.PWD}/${NAME}`
}

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

  return new Map().set('site', { translated, token: TOKEN })
}

function nameFile () {
  return NAME
}

function SiteTranslator (data) {
  Object.assign(this, new Translator({
    ...data,
    interpretToken,
    createLexicon,
    nameFile
  }), {
    ignoreAbstract: true
  })
}

module.exports = SiteTranslator
