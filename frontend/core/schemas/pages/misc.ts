import { graphql } from '~/graphql/authoring'

export const communityTagGroups = graphql(`
  query PageCommunityTagGroups($community: String!, $thread: Thread) {
    communityTagGroups(community: $community, thread: $thread) {
      id
      title
      index
      tags {
        ...PageTagFields
      }
    }
  }
`)

export const communityTagStats = graphql(`
  query CommunityTagStats($community: String!, $thread: Thread!, $slug: String!) {
    communityTagStats(community: $community, thread: $thread, slug: $slug) {
      contentsCount
      todayContentsCount
    }
  }
`)

export const themePresets = graphql(`
  query ThemePresets {
    themePresets {
      value
      tokens
    }
  }
`)

export const categories = graphql(`
  query PageCategories {
    categories {
      id
      title
      slug
      index
    }
  }
`)
