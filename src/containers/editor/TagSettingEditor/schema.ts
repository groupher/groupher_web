import { gql } from 'urql/core'

const deleteArticleTag = gql`
  mutation ($id: ID!, $community: String!, $thread: Thread) {
    deleteArticleTag(id: $id, community: $community, thread: $thread) {
      id
    }
  }
`

const simpleQuery = gql`
  query ($filter: filter!) {
    post(id: $id) {
      id
    }
  }
`

const schema = {
  deleteArticleTag,
  simpleQuery,
}

export default schema
