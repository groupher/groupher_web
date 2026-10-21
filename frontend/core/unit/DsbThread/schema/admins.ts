import { graphql } from '~/graphql/authoring'

export const moderatorPage = graphql(`
  query DashboardModeratorPage($community: String!, $pagi: PagiInput) {
    pagedCommunityModerators(community: $community, pagi: $pagi) {
      entries {
        id
        isRoot
        passportItemCount
        user {
          login
          avatar
          nickname
          bio
        }
      }
      pageInfo {
        __typename
        hasNextPage
        hasPreviousPage
        ... on OffsetPageInfo {
          page
          size
          totalCount
          totalPages
        }
        ... on CursorPageInfo {
          startCursor
          endCursor
        }
      }
    }
  }
`)

export const userPassport = graphql(`
  query DashboardUserPassport($login: String!) {
    user(login: $login) {
      passportString
    }
  }
`)

export const searchUsers = graphql(`
  query DashboardSearchUsers($name: String!, $community: String!) {
    moderatorCandidates(name: $name, community: $community) {
      login
      avatar
      nickname
      bio
      social {
        github
        twitter
        zhihu
      }
    }
  }
`)

export const addModerator = graphql(`
  mutation DashboardAddModerator($commandId: ID!, $community: String!, $user: String!) {
    addModerator(commandId: $commandId, community: $community, user: $user) {
      slug
    }
  }
`)

export const addModerators = graphql(`
  mutation DashboardAddModerators($commandId: ID!, $community: String!, $users: [String!]!) {
    addModerators(commandId: $commandId, community: $community, users: $users) {
      slug
    }
  }
`)

export default {
  moderatorPage,
  userPassport,
  searchUsers,
  addModerator,
  addModerators,
}
