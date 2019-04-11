const { AuthenticationError } = require('apollo-server')
const winston = require('winston')

const db = require('./database')
const { contractAuthToken } = require('./auth')

async function context({ req, connection }) {
  let userId

  if (connection) {
    return connection.context
  }

  try {
    const authorization = req.headers.authorization

    if (authorization) {
      const token = authorization.split(/\s+/)[1]

      if (token) {
        const tokenData = await contractAuthToken(token)

        if (tokenData) {
          userId = tokenData.userId
        }
      }
    }
  } catch (error) {
    winston.error(error)
  }

  return {
    ...db,
    ...(userId ? { userId } : {})
  }
}

module.exports = {
  context
}
