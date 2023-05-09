import { gql } from 'urql/core'
import { F } from '@/schemas'

const updateDashboardEnable = gql`
  mutation ($community: String!, $post: Boolean, $changelog: Boolean, $about: Boolean) {
    updateDashboardEnable(
      community: $community
      post: $post
      changelog: $changelog
      about: $about
    ) {
      id
    }
  }
`

const updateDashboardLayout = gql`
  mutation (
    $community: Stirng!
    $postLayout: String
    $kanbanLayout: String
    $broadcastEnable: Boolean
    $kanbanBgColors: [String]
  ) {
    updateDashboardLayout(
      community: $community
      postLayout: $postLayout
      kanbanLayout: $kanbanLayout
      broadcastEnable: $broadcastEnable
      kanbanBgColors: $kanbanBgColors
    ) {
      id
    }
  }
`

const updateDashboardNameAlias = gql`
  mutation ($community: String!, $nameAlias: [dashboardAliasMap]) {
    updateDashboardNameAlias(community: $community, nameAlias: $nameAlias) {
      id
      title
    }
  }
`

const pagedArticleTags = gql`
  query ($filter: ArticleTagsFilter) {
    pagedArticleTags(filter: $filter) {
      entries {
        ${F.tag}
      }
      totalCount
    }
  }
`

const schema = {
  pagedArticleTags,
  updateDashboardEnable,
  updateDashboardLayout,
  updateDashboardNameAlias,
}

export default schema
