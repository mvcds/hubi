const fs = require('fs')
const path = require('path')

function isValidFile (file) {
  return this.base !== file
}

const base = path.basename(__filename)

const ignoreInvalidFiles = isValidFile.bind({ base })

function requireFile (files, filePath) {
  const name = path.parse(filePath).name
  const file = require(`${__dirname}/${filePath}`)

  return {
    ...files,
    [name]: file
  }
}

const files = fs.readdirSync(__dirname)
  .filter(ignoreInvalidFiles)
  .reduce(requireFile, {})

module.exports = files
