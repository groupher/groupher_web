import { gql } from 'urql/core'

const community = gql`
  query community($slug: String) {
    community(slug: $slug) {
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
      slug
    }
  }
`
const unsubscribeCommunity = gql`
  mutation ($communityId: ID!) {
    unsubscribeCommunity(communityId: $communityId) {
      id
      slug
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
