import { gql } from 'urql/core'
import { F, P } from '@/schemas'

const pagedUsers = gql`
  query($filter: PagedUsersFilter!) {
    pagedUsers(filter: $filter) {
      entries {
        ${F.author}
        location
      }
      ${F.pagi}
    }
  }
`

const pagedCommunitySubscribers = gql`
  query($id: ID, $community: String, $filter: PagiFilter!, $userHasLogin: Boolean!) {
    pagedCommunitySubscribers(id: $id, community: $community, filter: $filter) {
      entries {
        ${F.author}
        location
        viewerHasFollowed @include(if: $userHasLogin)
      }
      ${F.pagi}
    }
  }
`

const pagedFollowers = gql`
  query($userId: ID, $filter: PagiFilter!, $userHasLogin: Boolean!) {
    pagedFollowers(userId: $userId, filter: $filter) {
      entries {
        ${F.author}
        location
        viewerHasFollowed @include(if: $userHasLogin)
      }
      totalCount
    }
  }
`

const pagedFollowings = gql`
  query($userId: ID, $filter: PagiFilter!, $userHasLogin: Boolean!) {
    pagedFollowings(userId: $userId, filter: $filter) {
      entries {
        ${F.author}
        location
        viewerHasFollowed @include(if: $userHasLogin)
      }
      totalCount
    }
  }
`
const pagedCommunityEditors = gql`
  query($id: ID!, $filter: PagiFilter!, $userHasLogin: Boolean!) {
    pagedCommunityEditors(id: $id, filter: $filter) {
      entries {
        ${F.author}
        location
        viewerHasFollowed @include(if: $userHasLogin)
      }
      ${F.pagi}
    }
  }
`

const follow = gql`
  ${P.follow}
`

const undoFollow = gql`
  ${P.undoFollow}
`

const schema = {
  pagedUsers,
  pagedCommunitySubscribers,
  pagedFollowers,
  pagedFollowings,
  pagedCommunityEditors,

  follow,
  undoFollow,
}

export default schema
