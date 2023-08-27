import { gql } from 'urql/core'

const simpleMutation = gql`
  mutation ($id: ID!) {
    post(id: $id) {
      id
    }
  }
`

const allPassportRules = gql`
  query {
    allPassportRules {
      root
      moderator
    }
  }
`

const schema = {
  simpleMutation,
  allPassportRules,
}

export default schema
