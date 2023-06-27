import { gql } from 'urql/core'
import { F } from '@/schemas'

const updateDashboardBaseInfo = gql`
  mutation (
    $community: String!
    $homepage: String
    $title: String
    $slug: String
    $desc: String
    $logo: String
    $favicon: String
  ) {
    updateDashboardBaseInfo(
      community: $community
      homepage: $homepage
      title: $title
      slug: $slug
      desc: $desc
      logo: $logo
      favicon: $favicon
    ) {
      id
      title
    }
  }
`
const updateDashboardSeo = gql`
  mutation (
    $community: String!
    $ogSiteName: String
    $ogTitle: String
    $ogDescription: String
    $ogUrl: String
    $ogImage: String
    $ogLocale: String
    $ogPublisher: String
    $twTitle: String
    $twDescription: String
    $twUrl: String
    $twCard: String
    $twSite: String
    $twImage: String
    $twImageWidth: String
    $twImageHeight: String
  ) {
    updateDashboardSeo(
      community: $community
      ogSiteName: $ogSiteName
      ogTitle: $ogTitle
      ogDescription: $ogDescription
      ogUrl: $ogUrl
      ogImage: $ogImage
      ogLocale: $ogLocale
      ogPublisher: $ogPublisher
      twTitle: $twTitle
      twDescription: $twDescription
      twUrl: $twUrl
      twCard: $twCard
      twSite: $twSite
      twImage: $twImage
      twImageWidth: $twImageWidth
      twImageHeight: $twImageHeight
    ) {
      id
      title
    }
  }
`
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

const updateDashboardSocialLinks = gql`
  mutation ($community: String!, $socialLinks: [dashboardSocialLinkMap]) {
    updateDashboardSocialLinks(community: $community, socialLinks: $socialLinks) {
      id
      title
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
    $slug: String
    $community: String!
    $extra: [String]
    $icon: String
    $group: String
  ) {
    updateArticleTag(
      id: $id
      color: $color
      title: $title
      slug: $slug
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
  updateDashboardBaseInfo,
  updateDashboardSeo,
  pagedArticleTags,
  updateDashboardEnable,
  updateDashboardLayout,
  updateDashboardSocialLinks,
  updateDashboardNameAlias,
  updateArticleTag,
  reindexTagsInGroup,
}

export default schema
