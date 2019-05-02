const typeDefs = /* GraphQL */ `
  type QRCode {
    id: ID
    userId: ID
    title: String
    redirectUrl: String
    description: String
    qrcodeUrl: String
  }

  input QRCodeInput {
    title: String
    redirectUrl: String
    description: String
  }

  extend type Query {
    qrcodes: [QRCode]
    qrcode(id: ID): QRCode
  }

  extend type Mutation {
    createQRCode(qrcodeInput: QRCodeInput): QRCode
    updateQRCode(id: ID, qrcodeInput: QRCodeInput): QRCode
    removeQRCode(id: ID): QRCode
  }

  extend type Subscription {
    qrcodeAdded: QRCode
    qrcodeUpdated: QRCode
    qrcodeRemoved: QRCode
  }
`

module.exports = {
  typeDefs
}
