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
  query community($slug: String, $userHasLogin: Boolean!) {
    community(slug: $slug) {
      ${F.community}
      viewerHasSubscribed @include(if: $userHasLogin)
      threads {
        title
        slug
        index
      }
      contributesDigest
      editorsCount
      meta {
        postsCount
        blogsCount
      }
      dashboard {
        baseInfo {
          title
          favicon
          homepage
          logo
          slug
          desc
        }
        seo {
          ogSiteName
          ogTitle
          ogDescription
          ogUrl
          ogImage
          ogLocale
          ogPublisher
          twTitle
          twDescription
          twUrl
          twCard
          twSite
          twImage
          twImageWidth
          twImageHeight
        }
        nameAlias {
          slug
          name
          original
          group
        }
        layout {
          primaryColor
          postLayout
          docLayout
          avatarLayout
          brandLayout
          topbarLayout
          topbarBg
          broadcastLayout
          kanbanLayout
          kanbanBgColors
          docFaqLayout
          changelogLayout
          footerLayout
        }

        baseInfo {
          favicon
        }

        socialLinks {
          type
          link
        }

        rss {
          rssFeedType
          rssFeedCount
        }

        enable {
          post
          kanban
          changelog
          doc
          about
        }

        faqs {
          title
          body
          index
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
