const { typeDefs } = require('./types')

const resolvers = {
  Query: {
    hello: () => {
      return {
        text: 'Hello, World!'
      }
    }
  }
}

const helloSchema = {
  typeDefs,
  resolvers
}

module.exports = {
  helloSchema
}
