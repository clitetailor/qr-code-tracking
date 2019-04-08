const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const winston = require('winston')
const path = require('path')

const { graphqlSchema } = require('./schema')
const { configureLogging } = require('./logging')
const { configureDotEnv } = require('./dotenv')
const { context } = require('./context')

configureLogging()
configureDotEnv()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = new ApolloServer({
  schema: graphqlSchema,
  introspection: true,
  playground: true,
  context
})
server.applyMiddleware({ app })

app.use(history())
app.use(express.static(path.resolve(__dirname, '../public')))

app.listen(4000, () => {
  winston.info(`🚀  Server ready at http://localhost:4000`)
  winston.info(
    'GraphQL server is available at https://localhost:4000/graphql'
  )
})
