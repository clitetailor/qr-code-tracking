const util = require('util')
const jwt = require('jsonwebtoken')

function generateAuthToken({ userId }) {
  return util.promisify(jwt.sign)(
    { userId },
    process.env.APP_SECRET_KEY,
    {
      algorithm: 'HS256'
    }
  )
}

async function contractAuthToken(token) {
  const { userId, iat } = await util.promisify(jwt.verify)(
    token,
    process.env.APP_SECRET_KEY,
    {
      algorithm: 'HS256'
    }
  )

  return { userId, iat }
}

module.exports = {
  generateAuthToken,
  contractAuthToken
}
