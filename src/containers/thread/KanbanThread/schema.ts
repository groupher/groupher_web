import { gql } from 'urql/core'

import { F } from '@/schemas'

const groupedKanbanPosts = gql`
  query groupedKanbanPosts($community: String!) {
    groupedKanbanPosts(community: $community) {
      todo {
        entries {
          innerId
          cat
          state
          title
          originalCommunityRaw
          meta {
            thread
          }
          author {
            ${F.author}
          }
        }
        ${F.pagi}
      }

      wip {
        entries {
          innerId
          cat
          state
          title
          originalCommunityRaw
          meta {
            thread
          }
          author {
            ${F.author}
          }
        }
        ${F.pagi}
      }

      done {
        entries {
          innerId
          cat
          state
          title
          originalCommunityRaw
          meta {
            thread
          }
          author {
            ${F.author}
          }
        }
        ${F.pagi}
      }
    }
  }
`

const schema = {
  groupedKanbanPosts,
}

export default schema
