import { gql } from 'urql/core'

const updateDashboardEnable = gql`
  mutation ($community: String!, $post: Boolean, $changelog: Boolean, $about: Boolean) {
    updateDashboardEnable(
      community: $community
      post: $post
      changelog: $changelog
      about: $about
    ) {
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
  updateDashboardEnable,
  simpleQuery,
}

export default schema
