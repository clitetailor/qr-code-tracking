const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const { ApolloServer } = require('apollo-server-koa')

const { graphqlSchema } = require('./schema')

const app = new Koa()

app.use(cors())
app.use(koaBody())

const server = new ApolloServer({
  schema: graphqlSchema,
  introspection: true,
  playground: true
})
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(
    `🚀  Server ready at http://localhost:4000${
      server.graphqlPath
    }`
  )
)
