#!/usr/bin/env node

const { version } = require('./package.json')
const program = require('commander')

require('./src/CLI')(program)

program.version(version, '-v, --version')
  .parse(process.argv)
