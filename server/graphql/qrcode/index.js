const { typeDefs } = require('./types')
const { generateQRCode } = require('../../qrcode')

const resolvers = {
  Mutation: {
    createQRCode: async (root, args, context) => {
      const { QRCode } = context
      const { qrcodeInput } = args

      const qrcode = await QRCode.create(qrcodeInput)

      const qrcodeUrl = await generateQRCode(qrcode.id)
      qrcode.update({
        qrcodeUrl
      })

      return qrcode
    }
  }
}

const qrcodeSchema = {
  resolvers,
  typeDefs
}

module.exports = {
  qrcodeSchema
}
