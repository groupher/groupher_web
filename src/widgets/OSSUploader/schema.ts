import { gql } from 'urql/core'

const applyUploadTokens = gql`
  query {
    applyUploadTokens {
      accessKeyId
      accessKeySecret
      expiration
      securityToken
    }
  }
`

const schema = {
  applyUploadTokens,
}

export default schema
