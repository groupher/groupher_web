import { gql } from 'urql/core'

const deleteArticleTag = gql`
  mutation ($id: ID!, $community: String!, $thread: Thread) {
    deleteArticleTag(id: $id, community: $community, thread: $thread) {
      id
    }
  }
`
const createArticleTag = gql`
  mutation (
    $thread: Thread!
    $title: String!
    $slug: String!
    $color: RainbowColor!
    $group: String
    $community: String!
  ) {
    createArticleTag(
      thread: $thread
      title: $title
      slug: $slug
      color: $color
      group: $group
      community: $community
    ) {
      id
    }
  }
`
const updateArticleTag = gql`
  mutation (
    $id: ID!
    $color: RainbowColor
    $title: String
    $slug: String
    $community: String!
    $group: String
  ) {
    updateArticleTag(
      id: $id
      color: $color
      title: $title
      slug: $slug
      community: $community
      group: $group
    ) {
      id
    }
  }
`

const schema = {
  deleteArticleTag,
  createArticleTag,
  updateArticleTag,
}

export default schema
