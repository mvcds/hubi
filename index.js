#!/usr/bin/env node

const package = require('./package.json')
const program = require('commander')
const colors = require('colors')

require('./src/CLI')(program)

program.version(package.version, '-v, --version')
  .parse(process.argv)
