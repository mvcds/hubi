const DEPENDENCIES = {
  fs: require('fs'),
  location: __filename,
  require,
  path: require('path')
}

//TODO: use only one Regex
function isValidFile (file) {
  return this.base !== file
    && /\.js$/i.test(file)
    && !/\.test.js$/i.test(file)
}

function addUsage (file) {
  const name = file.substr(0, file.lastIndexOf('.'))
  const full = this.path.join(this.target, file)

  this.require(full)(this.program)
}

function ReadProgram (program, injection) {
  const { fs, require, location, path } = Object.assign({}, DEPENDENCIES, injection)

  const target = path.dirname(location)
  const base = path.basename(location)

  const ignoreInvalidFiles = isValidFile.bind({ base })
  const installCommand = addUsage.bind({ program, target, require, path })

  fs.readdirSync(target)
    .filter(ignoreInvalidFiles)
    .forEach(installCommand)
}

module.exports = ReadProgram
