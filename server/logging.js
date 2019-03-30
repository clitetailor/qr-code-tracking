const { transports, format, configure } = require('winston')
const moment = require('moment')

const production = process.env.NODE_ENV === 'production'

function configureLogging() {
  configure({
    level: production ? 'info' : 'debug',
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format() {
          return production
            ? new Date().toISOString()
            : moment().format('HH:mm:ss.SSS')
        }
      }),
      format.printf(
        info =>
          `[${info.timestamp}] [${info.level}]: ${info.message}`
      )
    ),
    transports: [
      new transports.Console({
        handleExceptions: true
      })
    ]
  })
}

module.exports = {
  configureLogging
}
