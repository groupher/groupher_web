import { graphql } from '~/graphql/authoring'

export const doc = graphql(`
  query PageDoc($article: ArticlePathInput!) {
    doc(article: $article) {
      ...PageDocFields
      subtitle
      ...PageDocDetailFields
    }
  }
`)

export const docPublicTree = graphql(`
  query PageDocPublicTree($community: String!) {
    docPublicTree(community: $community) {
      tabs {
        ...PageDocPublicTreeNodeFields
        pins {
          ...PageDocPublicTreeNodeFields
        }
        groups {
          ...PageDocPublicTreeGroupFields
        }
      }
    }
  }
`)

export const docPage = graphql(`
  query DocPage($pagi: PagiInput, $filter: ArticlePageFilter) {
    docPage(pagi: $pagi, filter: $filter) {
      pinnedEntries {
        ...PageDocLiteFields
      }
      entries {
        ...PageDocLiteFields
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
