import { gql } from 'urql'
import { P } from '@/schemas'

const mentions = gql`
  ${P.mentions}
`

const schema = {
  mentions,
}

export default schema
