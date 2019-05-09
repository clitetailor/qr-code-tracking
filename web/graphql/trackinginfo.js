import gql from 'graphql-tag'

import { client } from './client'

export async function getTrackingInfos(qrcodeId) {
  const payload = await client.query({
    query: gql`
      query GetTrackingInfos($qrcodeId: ID) {
        trackingInfos(qrcodeId: $qrcodeId) {
          id
          qrcodeId
          latitude
          longitude
          redirectUrl
          userAgent
        }
      }
    `,
    variables: {
      qrcodeId
    }
  })

  return payload.data.trackingInfos
}

export async function addTrackingInfo(trackingInfoInput) {
  const payload = await client.mutate({
    mutation: gql`
      mutation AddTrackingInfo(
        $trackingInfoInput: TrackingInfoInput
      ) {
        addTrackingInfo(trackingInfoInput: $trackingInfoInput) {
          id
          redirectUrl
        }
      }
    `,
    variables: {
      trackingInfoInput
    }
  })

  return payload.data.addTrackingInfo
}

export function trackingInfoAdded(qrcodeId) {
  return client
    .subscribe({
      query: gql`
        subscription TrackingInfoAdded($qrcodeId: ID) {
          trackingInfoAdded(qrcodeId: $qrcodeId) {
            id
            qrcodeId
            latitude
            longitude
            redirectUrl
            userAgent
          }
        }
      `,
      variables: {
        qrcodeId
      }
    })
    .map(payload => payload.data.trackingInfoAdded)
}
