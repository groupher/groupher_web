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

const updateDashboardLayout = gql`
  mutation (
    $community: Stirng!
    $postLayout: String
    $broadcastEnable: Boolean
    $kanbanBgColors: [String]
  ) {
    updateDashboardLayout(
      community: $community
      postLayout: $postLayout
      broadcastEnable: $broadcastEnable
      kanbanBgColors: $kanbanBgColors
    ) {
      id
    }
  }
`

const schema = {
  updateDashboardEnable,
  updateDashboardLayout,
}

export default schema
