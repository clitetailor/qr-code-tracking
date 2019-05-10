import gql from 'graphql-tag'
import { client } from './client'

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

  localStorage.setItem('token', payload.data.signup.token)
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

  localStorage.setItem('token', payload.data.login.token)
  await client.resetStore()

  return payload
}

export async function logout() {
  localStorage.removeItem('token')
  client.resetStore()
  client.stop()
}

export async function checkAuth() {
  const payload = await client.query({
    query: gql`
      query CheckAuth {
        checkAuth {
          ok
        }
      }
    `
  })

  return payload.data.checkAuth
}
