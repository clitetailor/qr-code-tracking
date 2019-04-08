import { ApolloClient } from 'apollo-client'
import { concat } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

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

export const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()
})
