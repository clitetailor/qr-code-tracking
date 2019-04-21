const util = require('util')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

function generateAuthToken({ userId }) {
  return util.promisify(jwt.sign)(
    { userId },
    process.env.SECRET_KEY,
    {
      algorithm: 'HS256'
    }
  )
}

async function verifyAuthToken(token) {
  const { userId, iat } = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY,
    {
      algorithm: 'HS256'
    }
  )

  return { userId, iat }
}

function requireAuth(callback) {
  return (root, args, context, ...rest) => {
    if (!context.userId) {
      return new AuthenticationError('Unauthenticated')
    }

    return callback(root, args, context, ...rest)
  }
}

module.exports = {
  generateAuthToken,
  verifyAuthToken,
  requireAuth
}
