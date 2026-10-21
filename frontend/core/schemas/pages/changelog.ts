import { graphql } from '~/graphql/authoring'

export const changelog = graphql(`
  query Changelog($article: ArticlePathInput!) {
    changelog(article: $article) {
      ...PageChangelogFields
      ...PageChangelogDetailFields
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
        ...PageChangelogLiteFields
      }
      entries {
        ...PageChangelogLiteFields
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
