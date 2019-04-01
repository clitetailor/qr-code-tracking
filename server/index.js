const Koa = require('koa')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const router = require('koa-router')
const serve = require('koa-static')
const { ApolloServer } = require('apollo-server-koa')
const winston = require('winston')
const history = require('connect-history-api-fallback')
const path = require('path')

const { graphqlSchema } = require('./schema')
const { configureLogging } = require('./logging')
const { configureDotEnv } = require('./dotenv')
const { context } = require('./context')

configureLogging()
configureDotEnv()

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(serve(path.resolve(__dirname, '../public')))

const server = new ApolloServer({
  schema: graphqlSchema,
  introspection: true,
  playground: true,
  context
})
server.applyMiddleware({ app })

app.listen({ port: 4000 }, async () => {
  winston.info(
    `🚀  Server ready at http://localhost:4000${
      server.graphqlPath
    }`
  )
})
