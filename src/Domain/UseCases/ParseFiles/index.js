const fs = require('fs')
const yaml = require('js-yaml')
const glob = require('glob')
const write = require('write')

const DEFAULTS = {
  pattern: `${process.env.PWD}/**/*.yml`,
  output: 'domain'
}

function parseFile(error, file) {
  const jsonFile = yaml.safeLoad(file)

  const { name } = jsonFile

  write(`${this.output}/${name}.json`, JSON.stringify(jsonFile, null, '  '))
}

function readFile(filePath) {
  fs.readFile(filePath, 'utf8', parseFile.bind(this))
}

function sendToParser(error, files) {
  files.forEach(readFile, this)
}

async function ParseFiles(params) {
  const { pattern, output } = Object.assign({}, DEFAULTS, params)

  glob(pattern, sendToParser.bind({ output }))
}

module.exports = ParseFiles
