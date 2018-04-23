const RequiresAttribute = require('../../Services/RequiresAttribute')

const WriteUbiquitousLanguage = require('../WriteUbiquitousLanguage')

// TODO: injection here
function save ({ object, write, filePath }) {
  write(filePath, object)
}

async function SaveUbiquitousLanguageIntoFile (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator',
    output: 'output'
  })

  return WriteUbiquitousLanguage.call({ action: save }, data)
}

module.exports = SaveUbiquitousLanguageIntoFile
