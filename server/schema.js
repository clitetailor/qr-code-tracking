const { makeExecutableSchema } = require('apollo-server')
const { merge } = require('lodash')

const { helloSchema } = require('./graphql/hello')
const { rootSchema } = require('./graphql/root')

const { typeDefs, resolvers } = mergeSchemas({
  schemas: [rootSchema, helloSchema]
})

const graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers
})

function mergeSchemas({ schemas }) {
  return {
    typeDefs: schemas.map(schema => schema.typeDefs),
    resolvers: merge(...schemas.map(schema => schema.resolvers))
  }
}

module.exports = {
  graphqlSchema
}
