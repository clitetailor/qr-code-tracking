import gql from 'graphql-tag'
import { client } from './client'

export async function createQRCode(qrcodeInput) {
  const payload = await client.mutate({
    mutation: gql`
      mutation CreateQRCode($qrcodeInput: QRCodeInput) {
        createQRCode(qrcodeInput: $qrcodeInput) {
          id
          title
          redirectUrl
          description
        }
      }
    `,
    variables: {
      qrcodeInput
    }
  })

  return payload.data.createQRCode
}

export async function updateQRCode(id, qrcodeInput) {
  const payload = await client.mutate({
    mutation: gql`
      mutation UpdateQRCode(
        $id: ID
        $qrcodeInput: QRCodeInput
      ) {
        updateQRCode(id: $id, qrcodeInput: $qrcodeInput) {
          title
          description
        }
      }
    `,
    variables: {
      id,
      qrcodeInput
    }
  })

  return payload.data.updateQRCode
}

export async function getQRCode(id) {
  const payload = await client.query({
    query: gql`
      query GetQRCode($id: ID) {
        qrcode(id: $id) {
          id
          title
          redirectUrl
          description
          qrcodeUrl
        }
      }
    `,
    variables: {
      id
    }
  })

  return payload.data.qrcode
}

export async function getQRCodePublicData(id) {
  const payload = await client.query({
    query: gql`
      query GetQRCodePublicData($id: ID) {
        qrcodePublicData(id: $id) {
          id
          redirectUrl
        }
      }
    `,
    variables: {
      id
    }
  })

  return payload.data.qrcodePublicData
}

export async function getQRCodes() {
  const payload = await client.query({
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

  return payload.data.qrcodes
}

export async function removeQRCode(qrcodeId) {
  const payload = await client.mutate({
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

  return payload.data.removeQRCode
}

export function qrcodeAdded() {
  return client
    .subscribe({
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
    .map(payload => payload.data.qrcodeAdded)
}

export function qrcodeUpdated() {
  return client
    .subscribe({
      query: gql`
        subscription QRCodeUpdated {
          qrcodeUpdated {
            id
            title
            description
            qrcodeUrl
          }
        }
      `
    })
    .map(payload => payload.data.qrcodeUpdated)
}

export function qrcodeRemoved() {
  return client
    .subscribe({
      query: gql`
        subscription QRCodeRemoved {
          qrcodeRemoved {
            id
          }
        }
      `
    })
    .map(payload => payload.data.qrcodeRemoved)
}
