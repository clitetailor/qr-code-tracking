const { makeExecutableSchema } = require('apollo-server')
const { merge } = require('lodash')

const { dateSchema } = require('./graphql/date')
const { helloSchema } = require('./graphql/hello')
const { rootSchema } = require('./graphql/root')
const { userSchema } = require('./graphql/user')
const { qrcodeSchema } = require('./graphql/qrcode')
const { trackingInfoSchema } = require('./graphql/trackinginfo')

const { typeDefs, resolvers } = mergeSchemas({
  schemas: [
    dateSchema,
    rootSchema,
    helloSchema,
    userSchema,
    qrcodeSchema,
    trackingInfoSchema
  ]
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
