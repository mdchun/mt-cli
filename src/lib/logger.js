const chalk = require('chalk')
const format = require('util').format

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.white(msg))
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = exports.error = (...args) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(msg))
  process.exit(1)
}

/**
 * Log a warn `message` to the console and exit.
 *
 * @param {String} message
 */

exports.warn = (...args) => {
  const msg = format.apply(format, args)
  console.warn(chalk.blue(msg))
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = (...args) => {
  const msg = format.apply(format, args)
  console.log(chalk.yellow(msg))
}
