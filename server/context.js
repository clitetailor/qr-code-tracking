const db = require('./database')
const { verifyAuthToken } = require('./auth')

async function context({ req, connection }) {
  let userId

  if (connection) {
    return connection.context
  }

  if (req.headers.authorization) {
    try {
      const authToken = req.headers.authorization.split(
        /\s+/
      )[1]

      if (authToken) {
        tokenData = await verifyAuthToken(authToken)

        userId = tokenData.userId
      }
    } catch (error) {}
  }

  return {
    ...db,
    ...(userId ? { userId } : {})
  }
}

async function onConnect(connectionParams) {
  let userId

  if (connectionParams.authToken) {
    try {
      const authToken = await verifyAuthToken(
        connectionParams.authToken
      )

      if (authToken && authToken.userId) {
        userId = authToken.userId
      }
    } catch (error) {}
  }

  return {
    userId
  }
}

module.exports = {
  context,
  onConnect
}
