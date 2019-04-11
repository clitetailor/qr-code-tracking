const { PubSub } = require('graphql-subscriptions')
const { Sequelize } = require('sequelize')

const { typeDefs } = require('./types')
const { generateQRCode } = require('../../utils/qrcode')
const { requireAuth } = require('../../auth')

const Op = Sequelize.Op

const QRCodeActions = {
  QRCODE_ADDED: 'QRCODE_ADDED',
  QRCODE_REMOVED: 'QRCODE_REMOVED'
}

const pubsub = new PubSub()

const resolvers = {
  Mutation: {
    createQRCode: requireAuth(async (root, args, context) => {
      const { QRCode, userId } = context
      const { qrcodeInput } = args

      const qrcode = await QRCode.create({
        ...qrcodeInput,
        userId
      })

      const qrcodeUrl = await generateQRCode(qrcode.id)
      qrcode.update({
        qrcodeUrl
      })

      pubsub.publish(QRCodeActions.QRCODE_ADDED, {
        qrcodeAdded: qrcode
      })

      return qrcode
    }),

    removeQRCode: requireAuth(async (root, args, context) => {
      const { QRCode, userId } = context

      const qrcode = await QRCode.findOne({
        where: {
          id: args.id,
          userId
        }
      })

      if (qrcode) {
        qrcode.destroy()
      }
      pubsub.publish(QRCodeActions.QRCODE_REMOVED, {
        qrcodeRemoved: qrcode
      })

      return qrcode
    })
  },

  Query: {
    qrcodes: requireAuth(async (root, args, context) => {
      const { QRCode, userId } = context

      const qrcodes = await QRCode.findAll({
        where: {
          userId
        }
      })

      return qrcodes
    })
  },

  Subscription: {
    qrcodeAdded: {
      resolver: qrcode => {
        console.log(qrcode)

        return qrcode
      },

      subscribe: () =>
        pubsub.asyncIterator(QRCodeActions.QRCODE_ADDED)
    },

    qrcodeRemoved: {
      subscribe: () =>
        pubsub.asyncIterator(QRCodeActions.QRCODE_REMOVED)
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
