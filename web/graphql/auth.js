import { client } from './client'
import gql from 'graphql-tag'

export async function signup(username, password) {
  const payload = await client.mutate({
    mutation: gql`
      mutation Signup($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
          token
        }
      }
    `,
    variables: {
      username,
      password
    }
  })

  localStorage.setItem('token', payload.token)
  await client.resetStore()

  return payload
}

export async function login(username, password) {
  const payload = await client.mutate({
    mutation: gql`
      mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `,
    variables: {
      username,
      password
    }
  })

  localStorage.setItem('token', payload.token)
  await client.resetStore()

  return payload
}
