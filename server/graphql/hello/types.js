const typeDefs = /* GraphQL */ `
  type Hello {
    text: String
  }

  extend type Query {
    hello: Hello
  }
`

module.exports = { typeDefs }
