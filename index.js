const WriteUbiquitousLanguage = require('./src/Domain/UseCases/WriteUbiquitousLanguage')

function log ({ object }) {
  console.log(object)
}

// TODO: injection here
function save ({ object, write, filePath }) {
  write(filePath, object)
}

const Hubi = {
  log: WriteUbiquitousLanguage.bind({ action: log }),
  save: WriteUbiquitousLanguage.bind({ action: save })
}

module.exports = Hubi
