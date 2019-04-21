const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const winston = require('winston')
const path = require('path')

const { graphqlSchema } = require('./schema')
const { configureLogging } = require('./config/logging')
const { configureDotEnv } = require('./config/dotenv')
const { context, onConnect } = require('./context')

configureLogging()
configureDotEnv()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = new ApolloServer({
  schema: graphqlSchema,
  introspection: true,
  playground: true,
  context,
  subscriptions: {
    onConnect
  }
})
server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

// TODO: Need to be replaced with signed url.
app.use(
  '/assets',
  express.static(path.resolve(__dirname, 'assets'))
)

app.use(history())
app.use(express.static(path.resolve(__dirname, '../public')))

httpServer.listen({ port: 4000 }, () => {
  winston.info(`🚀  Server ready at http://localhost:4000`)
  winston.info(
    'GraphQL server is available at http://localhost:4000/graphql'
  )
})
