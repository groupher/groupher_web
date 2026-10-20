import { graphql } from '~/graphql/authoring'

export const changelog = graphql(`
  query Changelog($article: ArticlePathInput!) {
    changelog(article: $article) {
      ...PageChangelogFields
      ...PageChangelogDetailFields
    }
  }
`)

export const pagedChangelogs = graphql(`
  query PagedChangelogs($filter: PagedChangelogsFilter!) {
    pagedChangelogs(filter: $filter) {
      entries {
        ...PageChangelogFields
        meta {
          thread
          latestUpvotedUsers {
            ...PageCommonUserFields
          }
        }
        digest
        linkAddr
        commentsParticipants {
          ...PageAuthorFields
        }
      }
      ...PageChangelogPageInfo
    }
  }
`)

export const changelogPage = graphql(`
  query ChangelogPage(
    $pagi: PagiInput
    $filter: ChangelogFilter
    $thread: ChangelogThread = CHANGELOG
  ) {
    changelogPage(pagi: $pagi, filter: $filter, thread: $thread) {
      pinnedEntries {
        id
        thread
        innerId
        title
        digest
        insertedAt
        activeAt
        author {
          login
          nickname
          avatar
          bio
          shortbio
        }
        community {
          title
          slug
          index
          desc
          logo
          subscribersCount
          homepage
          articlesCount
          views
          pending
          insertedAt
          updatedAt
        }
        communityTags {
          id
          title
          layout
          desc
          slug
          color
          thread
          group
          groupId
          index
          community {
            slug
          }
        }
      }
      entries {
        id
        thread
        innerId
        title
        digest
        insertedAt
        activeAt
        author {
          login
          nickname
          avatar
          bio
          shortbio
        }
        community {
          title
          slug
          index
          desc
          logo
          subscribersCount
          homepage
          articlesCount
          views
          pending
          insertedAt
          updatedAt
        }
        communityTags {
          id
          title
          layout
          desc
          slug
          color
          thread
          group
          groupId
          index
          community {
            slug
          }
        }
      }
      pageInfo {
        __typename
        hasPreviousPage
        hasNextPage
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
