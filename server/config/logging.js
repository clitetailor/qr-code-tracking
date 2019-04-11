const { transports, format, configure } = require('winston')
const moment = require('moment')

const production = process.env.NODE_ENV === 'production'

let configured = false

function configureLogging() {
  if (configured) {
    return
  }

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
      format.splat(),
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

  configured = true
}

module.exports = {
  configureLogging
}
