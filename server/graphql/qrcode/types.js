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
  }
`

module.exports = {
  typeDefs
}
