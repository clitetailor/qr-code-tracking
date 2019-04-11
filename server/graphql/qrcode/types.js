const typeDefs = `
  type QRCode {
    id: ID
    title: String
    description: String
    qrcodeUrl: String
  }

  input QRCodeInput {
    title: String
    description: String
  }

  extend type Mutation {
    createQRCode(qrcodeInput: QRCodeInput): QRCode
    removeQRCode(id: ID): QRCode
  }

  extend type Query {
    qrcodes: [QRCode]
  }

  extend type Subscription {
    qrcodeAdded: QRCode
    qrcodeRemoved: QRCode
  }
`

module.exports = {
  typeDefs
}
