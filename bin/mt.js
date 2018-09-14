#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const logger = require('../src/lib/logger')

let templateURL = null

program
.version(pkg.version, '-v, --version')
.usage('init')
.option('-t, --template <v>', '自定义应用模板', url => {
  templateURL = url
})

program
.command('init [project_name]')
.description(pkg.description)
.alias('i')
.action(name => {
  if (!name) {
    logger.warn(`The default Apply name is currently userd: app.`)
  }
  require('../src/init')(name, templateURL)
})

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
