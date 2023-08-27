import { gql } from 'urql/core'

const userPassport = gql`
  query ($login: String) {
    user(login: $login) {
      cmsPassportString
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
  userPassport,
  allPassportRules,
}

export default schema
