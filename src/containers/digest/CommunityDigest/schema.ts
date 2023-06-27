import { gql } from 'urql/core'
import { P } from '@/schemas'

const community = gql`
  ${P.community}
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
  subscribeCommunity,
  unsubscribeCommunity,
}

export default schema
