import { gql } from 'urql/core'

const updateTitle = gql`
  mutation ($id: ID!, $title: String, $body: String, $articleTags: [ID]) {
    updatePost(id: $id, title: $title, body: $body, articleTags: $articleTags) {
      id
      title
    }
  }
`
const setPostCat = gql`
  mutation ($id: ID!, $cat: ArticleCatEnum!) {
    setPostCat(id: $id, cat: $cat) {
      id
      cat
    }
  }
`
const setPostState = gql`
  mutation ($id: ID!, $state: ArticleStateEnum!) {
    setPostState(id: $id, state: $state) {
      id
      state
    }
  }
`

const pinPost = gql`
  mutation ($id: ID!, $communityId: ID!) {
    pinPost(id: $id, communityId: $communityId) {
      id
    }
  }
`

const undoPinPost = gql`
  mutation ($id: ID!, $communityId: ID!) {
    undoPinPost(id: $id, communityId: $communityId) {
      id
      isPinned
    }
  }
`

const schema = {
  updateTitle,
  setPostCat,
  setPostState,
  pinPost,
  undoPinPost,
}

export default schema
