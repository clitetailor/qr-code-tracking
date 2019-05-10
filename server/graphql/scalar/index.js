const { typeDefs } = require('./types')
const { dateResolvers } = require('./date')

const resolvers = {
  ...dateResolvers
}

const scalarSchema = {
  resolvers,
  typeDefs
}

module.exports = { scalarSchema }
