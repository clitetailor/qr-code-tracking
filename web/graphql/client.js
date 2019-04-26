import { ApolloClient } from 'apollo-client'
import { concat, split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const wsClient = new SubscriptionClient(
  'ws://localhost:4000/graphql',
  {
    reconnect: true,
    connectionParams: () => {
      return {
        authToken: localStorage.getItem('token')
      }
    }
  }
)

const wsLink = new WebSocketLink(wsClient)

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      ...(token
        ? { authorization: `Bearer ${token}` }
        : { authorization: undefined })
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return (
      kind === 'OperationDefinition' &&
      operation === 'subscription'
    )
  },
  wsLink,
  concat(authLink, httpLink)
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production'
})
