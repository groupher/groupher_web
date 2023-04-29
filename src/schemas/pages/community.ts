import F from '../fragments'

// contributesDigest
export const subscribedCommunities = `
  query subscribedCommunities($login: String, $filter: PagedFilter!) {
    subscribedCommunities(login: $login, filter: $filter) {
      entries {
        ${F.community}
        contributesDigest
      }
      ${F.pagi}
    }
  }
`
export const community = `
  query community($raw: String, $userHasLogin: Boolean!) {
    community(raw: $raw) {
      ${F.community}
      viewerHasSubscribed @include(if: $userHasLogin)
      threads {
        title
        raw
        index
      }
      contributesDigest
      editorsCount
      meta {
        postsCount
        blogsCount
      }
      dashboard {
        seo {
          ogTitle
          ogDescription
        }
        nameAlias {
          raw
          name
          original
          group
        }
        layout {
          primaryColor
          postLayout
          helpLayout
          avatarLayout
          brandLayout
          topbarLayout
          topbarBg
          broadcastLayout
          kanbanLayout
          kanbanBgColors
          helpFaqLayout
          changelogLayout
          footerLayout
        }

        baseInfo {
          favicon
        }

        rss {
          rssFeedType
          rssFeedCount
        }

        enable {
          post
          kanban
          changelog
          help
          about
        }
      }
    }
  }
`
export const pagedCommunities = `
  query($filter: CommunitiesFilter!, $userHasLogin: Boolean!) {
    pagedCommunities(filter: $filter) {
      entries {
        ${F.community}
        contributesDigest
        viewerHasSubscribed @include(if: $userHasLogin)
      }
      ${F.pagi}
    }
  }
`
