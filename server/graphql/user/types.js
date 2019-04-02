const typeDefs = `
  type AuthPayload {
    token: String
  }

  extend type Mutation {
    login(username: String, password: String): AuthPayload
    signup(username: String, password: String): AuthPayload
  }
`

module.exports = { typeDefs }
