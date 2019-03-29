const typeDefs = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`

module.exports = {
  typeDefs
}
