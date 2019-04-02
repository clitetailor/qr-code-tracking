const { AuthenticationError } = require('apollo-server')

const { generateAuthToken } = require('../../auth')

const resolvers = {
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

      const token = await generateAuthToken({ userId: user.id })

      return { token }
    },

    signup: async (root, args, context) => {
      const { User } = context
      const { username, password } = args

      const [user, created] = await User.findOrCreate({
        username,
        password
      })

      if (!created) {
        return AuthenticationError()
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
