const WriteUbiquitousLanguage = require('./src/Domain/UseCases/WriteUbiquitousLanguage')

function logLanguage ({ object }) {
  console.log(object)
}

// TODO: injection here
function writeLanguage ({ object, write, filePath }) {
  write(filePath, object)
}

const Hubi = {
  log: WriteUbiquitousLanguage.bind({ target: logLanguage }),
  save: WriteUbiquitousLanguage.bind({ target: writeLanguage })
}

module.exports = Hubi
