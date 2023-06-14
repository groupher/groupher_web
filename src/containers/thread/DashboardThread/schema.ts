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
    $footerLayout: String
    $headerLayout: String
    $broadcastEnable: Boolean
    $kanbanBgColors: [String]
  ) {
    updateDashboardLayout(
      community: $community
      postLayout: $postLayout
      kanbanLayout: $kanbanLayout
      footerLayout: $footerLayout
      headerLayout: $headerLayout
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

const updateArticleTag = gql`
  mutation (
    $id: ID!
    $color: RainbowColor
    $title: String
    $raw: String
    $community: String!
    $extra: [String]
    $icon: String
    $group: String
  ) {
    updateArticleTag(
      id: $id
      color: $color
      title: $title
      raw: $raw
      community: $community
      extra: $extra
      icon: $icon
      group: $group
    ) {
      id
      title
      color
      group
      extra
      icon
    }
  }
`

const reindexTagsInGroup = gql`
  mutation ($community: String!, $thread: Thread, $group: String!, $tags: [ArticleTagIndex]) {
    reindexTagsInGroup(community: $community, thread: $thread, group: $group, tags: $tags) {
      done
    }
  }
`

const schema = {
  pagedArticleTags,
  updateDashboardEnable,
  updateDashboardLayout,
  updateDashboardNameAlias,
  updateArticleTag,
  reindexTagsInGroup,
}

export default schema
