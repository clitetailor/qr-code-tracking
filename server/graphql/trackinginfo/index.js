const { withFilter } = require('graphql-subscriptions')

const { typeDefs } = require('./types')
const { pubsub } = require('../pubsub')
const { requireAuth } = require('../../auth')

const TrackingInfoActions = {
  TRACKING_INFO_ADDED: 'TRACKING_INFO_ADDED'
}

const resolvers = {
  Query: {
    trackingInfos: requireAuth(async (root, args, context) => {
      const { TrackingInfo, QRCode, userId } = context
      const { qrcodeId } = args

      const trackingInfos = await TrackingInfo.findAll({
        where: {
          qrcodeId
        },
        include: {
          model: QRCode,
          as: 'QRCode',
          attributes: ['userId', 'redirectUrl'],
          where: {
            userId
          }
        }
      })

      return trackingInfos.map(
        ({
          id,
          qrcodeId,
          latitude,
          longitude,
          QRCode: qrcode
        }) => {
          return {
            id,
            userId: qrcode.userId,
            qrcodeId,
            latitude,
            longitude,
            redirectUrl: qrcode.redirectUrl
          }
        }
      )
    })
  },

  Mutation: {
    addTrackingInfo: async (root, args, context) => {
      const { TrackingInfo } = context
      const { trackingInfoInput } = args

      const trackingInfo = await TrackingInfo.create(
        trackingInfoInput
      )

      pubsub.publish(TrackingInfoActions.TRACKING_INFO_ADDED, {
        trackingInfoAdded: trackingInfo
      })

      return trackingInfo
    }
  },

  Subscription: {
    trackingInfoAdded: {
      subscribe: requireAuth(
        withFilter(
          () =>
            pubsub.asyncIterator(
              TrackingInfoActions.TRACKING_INFO_ADDED
            ),
          async (payload, args, context) => {
            const { QRCode } = context
            const qrcodeId = payload.trackingInfoAdded.qrcodeId

            const qrcode = await QRCode.findOne({
              where: {
                id: qrcodeId
              }
            })

            return (
              qrcode.userId === context.userId &&
              qrcodeId === parseInt(args.qrcodeId)
            )
          }
        )
      )
    }
  }
}

const trackingInfoSchema = {
  resolvers,
  typeDefs
}

module.exports = {
  trackingInfoSchema
}
