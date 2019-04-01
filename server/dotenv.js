const dotenv = require('dotenv')
const path = require('path')
const winston = require('winston')

const { configureLogging } = require('./logging')

function configureDotEnv() {
  configureLogging()

  const dotenvResult = dotenv.config({
    path: path.resolve(__dirname, '../.env')
  })

  if (dotenvResult.error) {
    winston.info()
  }
}

module.exports = {
  configureDotEnv
}
