const typeDefs = `
  type Hello {
    text: String
  }

  extend type Query {
    hello: Hello
  }
`

module.exports = { typeDefs }
