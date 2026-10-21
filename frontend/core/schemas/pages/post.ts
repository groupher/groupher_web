import { graphql } from '~/graphql/authoring'

export const post = graphql(`
  query Post($article: ArticlePathInput!) {
    post(article: $article) {
      ...PagePostFields
      ...PagePostDetailFields
    }
  }
`)

export const pagedPublishedPosts = graphql(`
  query PagedPublishedPosts($login: String!, $filter: ArticlePageFilter, $pagi: PagiInput) {
    pagedPublishedPosts(login: $login, filter: $filter, pagi: $pagi) {
      pinnedEntries {
        ...PagePostLiteFields
      }
      entries {
        ...PagePostLiteFields
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

export const groupedKanbanPosts = graphql(`
  query PagesGroupedKanbanPosts($community: String!) {
    groupedKanbanPosts(community: $community) {
      backlog {
        pinnedEntries {
          ...PagePostLiteFields
        }
        entries {
          ...PagePostLiteFields
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
      todo {
        pinnedEntries {
          ...PagePostLiteFields
        }
        entries {
          ...PagePostLiteFields
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
      wip {
        pinnedEntries {
          ...PagePostLiteFields
        }
        entries {
          ...PagePostLiteFields
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
      done {
        pinnedEntries {
          ...PagePostLiteFields
        }
        entries {
          ...PagePostLiteFields
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
      rejected {
        pinnedEntries {
          ...PagePostLiteFields
        }
        entries {
          ...PagePostLiteFields
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
  }
`)
export const kanbanPage = graphql(`
  query KanbanPage($community: String!, $filter: PostFilter, $pagi: PagiInput) {
    kanbanPage(community: $community, filter: $filter, pagi: $pagi) {
      pinnedEntries {
        ...PagePostLiteFields
      }
      entries {
        ...PagePostLiteFields
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

export const postPage = graphql(`
  query PostPage($pagi: PagiInput, $filter: PostFilter, $thread: PostThread = POST) {
    postPage(pagi: $pagi, filter: $filter, thread: $thread) {
      pinnedEntries {
        ...PagePostLiteFields
      }
      entries {
        ...PagePostLiteFields
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
