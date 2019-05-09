const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const { typeDefs } = require('./types')

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value)
      }
      return null
    }
  })
}

const dateSchema = {
  resolvers,
  typeDefs
}

module.exports = { dateSchema }
