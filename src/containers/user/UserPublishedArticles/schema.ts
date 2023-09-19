import { gql } from 'urql/core'
import { P } from '@/schemas'

import { titleCase, plural } from '@/fmt'

const getPagedPublishedArticlesSchema = (thread) => {
  return gql`
    ${P[`pagedPublished${plural(titleCase(thread))}`]}
  `
}

const schema = {
  getPagedPublishedArticlesSchema,
}

export default schema
