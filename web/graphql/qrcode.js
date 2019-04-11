import gql from 'graphql-tag'
import { client } from './client'

export function createQRCode(qrcodeInput) {
  return client.mutate({
    mutation: gql`
      mutation CreateQRCode($qrcodeInput: QRCodeInput) {
        createQRCode(qrcodeInput: $qrcodeInput) {
          title
          description
        }
      }
    `,
    variables: {
      qrcodeInput
    }
  })
}

export function getQRCodes() {
  return client.query({
    query: gql`
      query GetQRCodes {
        qrcodes {
          id
          title
          description
          qrcodeUrl
        }
      }
    `
  })
}

export function removeQRCode(qrcodeId) {
  return client.mutate({
    mutation: gql`
      mutation RemoveQRCode($id: ID) {
        removeQRCode(id: $id) {
          id
        }
      }
    `,
    variables: {
      id: qrcodeId
    }
  })
}

export function qrcodeAdded() {
  return client.subscribe({
    query: gql`
      subscription QRCodeAdded {
        qrcodeAdded {
          id
          title
          description
          qrcodeUrl
        }
      }
    `
  })
}

export function qrcodeRemoved() {
  return client.subscribe({
    query: gql`
      subscription QRCodeRemoved {
        qrcodeRemoved {
          id
        }
      }
    `
  })
}
