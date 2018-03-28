const DEPENDENCIES = {
  fs: require('fs'),
  cliFile: __filename,
  require,
  path: require('path')
}

//  TODO: use only one Regex
function isValidFile (file) {
  return this.base !== file &&
    /\.js$/i.test(file) &&
    !/\.test.js$/i.test(file)
}

function addCommand (file) {
  const path = this.path.join(__dirname, file)

  this.require(path)(this.program)
}

function ReadProgram (program, injection) {
  const { fs, require, cliFile, path } = Object.assign({}, DEPENDENCIES, injection)

  const base = path.basename(cliFile)

  const ignoreInvalidFiles = isValidFile.bind({ base })
  const installCommand = addCommand.bind({ program, require, path })

  fs.readdirSync(__dirname)
    .filter(ignoreInvalidFiles)
    .forEach(installCommand)
}

module.exports = ReadProgram
