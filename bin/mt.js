#!/usr/bin/env node

const program = require('commander')
let templateURL = null

program
.version(require('../package.json').version, '-v, --version')
.usage('init')
.option('-t, --template <v>', '自定义应用模板', url => {
  templateURL = url
})

program
.command('init [project_name]')
.description('create a new project')
.alias('i')
.action(name => {
  if (!name) {
    console.warn(`The default Apply name is currently userd: app`)
  }
  require('../src/init')(name, templateURL)
})

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
