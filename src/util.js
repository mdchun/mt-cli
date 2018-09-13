/**
 * @author madechun
 */

const fs = require('fs')
const path = require('path')
const download = require('download')
const logger = require('./lib/logger')
const tmplJSON = require('./tmpl.json')

const cwdPath = process.cwd()

const util = {
  downloadTpl: (url, pro) => {
    const {type} = pro

    logger.log(`\nStart to download ${type} template files ...\n`)

    return download(url, cwdPath, {
      extract: true,
      retries: 0,
      timeout: 10000
    })
  },

  mkdirProject: (pro = {}, tmpURL = false) => {
    const {name, type} = pro

    let templateURL = tmpURL || tmplJSON[type]
    const proPath = cwdPath + '/' + name

    if (!name) {
      return logger.error('Apply cannot be empty!')
    }

    if (fs.existsSync(proPath)) {
      return logger.error(`Apply ${name} already exists!`)
    }

    return util.downloadTpl(templateURL, pro).then(files => {
      const tpldir = path.join(cwdPath, files[0].path)

      try {
        fs.renameSync(tpldir, path.join(cwdPath, name))
      } catch (e) {
        fs.renameSync(tpldir, path.join(cwdPath, name))
      }

      logger.success(`The download is complate and ready to go.`)

      return Promise.resolve(files)
    }).catch(err => {
      logger.error(err)
    })
  },

  existsDirectory: target => {
    try {
      return fs.statSync(target).isDirectory()
    } catch (err) {
      return false
    }
  }

}

module.exports = util
