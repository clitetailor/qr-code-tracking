const { AuthenticationError } = require('apollo-server')

const { typeDefs } = require('./types')
const { generateAuthToken } = require('../../auth')

const resolvers = {
  Query: {
    checkAuth: (root, args, context) => {
      if (context.userId) {
        return {
          ok: true
        }
      }

      return {
        ok: false
      }
    }
  },

  Mutation: {
    login: async (root, args, context) => {
      const { User } = context
      const { username, password } = args

      const user = await User.findOne({
        where: {
          username,
          password
        }
      })

      if (!user) {
        return new AuthenticationError(
          'Invalid username or password'
        )
      }

      const token = await generateAuthToken({ userId: user.id })

      return { token }
    },

    signup: async (root, args, context) => {
      const { User } = context
      const { username, password } = args

      const [user, created] = await User.findOrCreate({
        where: {
          username
        },
        defaults: {
          username,
          password
        }
      })

      if (!created) {
        return new AuthenticationError(
          'Username already exists'
        )
      }

      const token = await generateAuthToken({ userId: user.id })

      return {
        token
      }
    }
  }
}

const userSchema = {
  typeDefs,
  resolvers
}

module.exports = {
  userSchema
}
