const RequiresAttribute = require('../../Services/RequiresAttribute')

const WriteUbiquitousLanguage = require('../WriteUbiquitousLanguage')

function log ({ object }) {
  console.log(object)
}

async function LogUbiquitousLanguageIntoConsole (data, injection) {
  RequiresAttribute(data, {
    pattern: 'pattern',
    translator: 'translator'
  })

  return WriteUbiquitousLanguage.call({ action: log }, data)
}

module.exports = LogUbiquitousLanguageIntoConsole
