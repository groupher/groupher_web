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
  query community($slug: String, $userHasLogin: Boolean!, $incViews: Boolean) {
    community(slug: $slug, incViews: $incViews) {
      ${F.community}
      viewerHasSubscribed @include(if: $userHasLogin)
      threads {
        title
        slug
        index
      }
      contributesDigest
      moderatorsCount
      meta {
        postsCount
        blogsCount
      }
      moderators {
        role
        passportItemCount
        user {
          login
          avatar
          nickname
          bio
        }
      }
      dashboard {
        baseInfo {
          favicon
          homepage
          logo
          desc
        }

        socialLinks {
          type
          link
        }
        seo {
          ogSiteName
          ogTitle
          ogDescription
          ogUrl
          ogImage
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
