const { ApolloError } = require('apollo-server')
const { withFilter } = require('graphql-subscriptions')

const { pubsub } = require('../pubsub')
const { typeDefs } = require('./types')
const { generateQRCode } = require('../../utils/qrcode')
const { requireAuth } = require('../../auth')

const QRCodeActions = {
  QRCODE_ADDED: 'QRCODE_ADDED',
  QRCODE_REMOVED: 'QRCODE_REMOVED',
  QRCODE_UPDATED: 'QRCODE_UPDATED'
}

const resolvers = {
  Query: {
    qrcode: requireAuth(async (root, args, context) => {
      const { QRCode, userId } = context
      const { id } = args

      const qrcode = await QRCode.findOne({
        where: {
          id,
          userId
        }
      })

      if (!qrcode) {
        return new ApolloError('QRCode does not exist')
      }

      return qrcode
    }),

    qrcodes: requireAuth(async (root, args, context) => {
      const { QRCode, userId } = context

      const qrcodes = await QRCode.findAll({
        where: {
          userId
        }
      })

      return qrcodes
    }),

    qrcodePublicData: async (root, args, context) => {
      const { QRCode } = context
      const { id } = args

      const qrcode = await QRCode.findOne({
        where: {
          id
        }
      })

      if (!qrcode) {
        return new ApolloError('QRCode does not exist')
      }

      const { redirectUrl } = qrcode

      return {
        id,
        redirectUrl
      }
    }
  },

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

    updateQRCode: requireAuth(async (root, args, context) => {
      const { QRCode, userId } = context
      const { id, qrcodeInput } = args

      const qrcode = await QRCode.findOne({
        where: {
          id,
          userId
        }
      })

      if (!qrcode) {
        return new ApolloError('QRCode does not exist')
      }

      qrcode.update(qrcodeInput)

      pubsub.publish(QRCodeActions.QRCODE_UPDATED, {
        qrcodeUpdated: qrcode
      })

      return qrcode
    }),

    removeQRCode: requireAuth(async (root, args, context) => {
      const { QRCode, TrackingInfo, userId } = context

      const qrcode = await QRCode.findOne({
        where: {
          id: args.id,
          userId
        }
      })

      if (qrcode) {
        await TrackingInfo.destroy({
          where: {
            qrcodeId: qrcode.id
          }
        })

        qrcode.destroy()
      }
      pubsub.publish(QRCodeActions.QRCODE_REMOVED, {
        qrcodeRemoved: qrcode
      })

      return qrcode
    })
  },

  Subscription: {
    qrcodeAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QRCodeActions.QRCODE_ADDED),
        (payload, args, context) =>
          context.userId === payload.qrcodeAdded.userId
      )
    },

    qrcodeUpdated: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(QRCodeActions.QRCODE_UPDATED),
        (payload, args, context) =>
          context.userId === payload.qrcodeUpdated.userId
      )
    },

    qrcodeRemoved: {
      subscribe: withFilter(
        () =>
          pubsub.asyncIterator(QRCodeActions.QRCODE_REMOVED),
        (payload, args, context) =>
          context.userId === payload.qrcodeRemoved.userId
      )
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
