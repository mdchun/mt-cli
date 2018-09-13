/**
 * @author madechun
 */

const util = require('./util')
const inquirer = require('inquirer')
const logger = require('./lib/logger')
const tmplJSON = require('./tmpl.json')

module.exports = (name = 'app', templateURL = false) => {
  const choices = Object.keys(tmplJSON)

  console.log('')
  logger.success('Welcome to mt project generator!')
  console.log('')

  const promptTask = inquirer.prompt([
    {
      name: 'name',
      message: `创建应用`,
      default: name
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择应用类型',
      choices: choices,
      default: choices[0]
    }
  ])

  Promise.all([
    promptTask
  ]).then(results => {
    const answers = results[0]
    util.mkdirProject(answers, templateURL)
  })
}
