import { gql } from 'urql/core'

const community = gql`
  query community($raw: String) {
    community(raw: $raw) {
      viewerHasSubscribed
      subscribersCount
    }
  }
`

const post = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      commentsCount
      collectsCount
      upvotesCount
      viewerHasCollected
      viewerHasUpvoted
    }
  }
`

const subscribeCommunity = gql`
  mutation ($communityId: ID!) {
    subscribeCommunity(communityId: $communityId) {
      id
      raw
    }
  }
`
const unsubscribeCommunity = gql`
  mutation ($communityId: ID!) {
    unsubscribeCommunity(communityId: $communityId) {
      id
      raw
    }
  }
`

const schema = {
  community,
  post,
  subscribeCommunity,
  unsubscribeCommunity,
}

export default schema
