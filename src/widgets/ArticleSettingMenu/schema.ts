import { gql } from 'urql/core'
// import { P } from '@/schemas'

const updateTitle = gql`
  mutation ($id: ID!, $title: String, $body: String, $articleTags: [ID]) {
    updatePost(id: $id, title: $title, body: $body, articleTags: $articleTags) {
      id
      title
    }
  }
`

const schema = {
  updateTitle,
}

export default schema
