const typeDefs = /* GraphQL */ `
  type TrackingInfo {
    id: ID
    qrcodeId: String
    latitude: Float
    longitude: Float
    redirectUrl: String
    userAgent: String
    createdAt: Date
  }

  input TrackingInfoInput {
    qrcodeId: String
    latitude: Float
    longitude: Float
    userAgent: String
  }

  extend type Query {
    trackingInfos(qrcodeId: ID): [TrackingInfo]
  }

  extend type Mutation {
    addTrackingInfo(
      trackingInfoInput: TrackingInfoInput
    ): TrackingInfo
  }

  extend type Subscription {
    trackingInfoAdded(qrcodeId: ID): TrackingInfo
  }
`

module.exports = {
  typeDefs
}
