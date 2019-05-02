const typeDefs = /* GraphQL */ `
  type AuthPayload {
    token: String
  }

  type CheckAuthPayload {
    ok: Boolean
  }

  extend type Query {
    checkAuth: CheckAuthPayload
  }

  extend type Mutation {
    login(username: String, password: String): AuthPayload
    signup(username: String, password: String): AuthPayload
  }
`

module.exports = { typeDefs }
