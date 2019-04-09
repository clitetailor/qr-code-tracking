import gql from 'graphql-tag'
import { client } from './client'

export function createQRCode(qrcodeInput) {
  client.mutate({
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
