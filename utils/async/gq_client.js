import { createClient, defaultExchanges } from 'urql/core'

/* import { onError } from 'apollo-link-error' */

import { GRAPHQL_ENDPOINT } from '@/config'

import { buildLog } from '../logger'
import BStore from '../bstore'

/* eslint-disable-next-line */
const log = buildLog('Async')

// see setup https://formidable.com/open-source/urql/docs/basics/core/
const client = createClient({
  url: GRAPHQL_ENDPOINT,
  fetchOptions: () => {
    return {
      headers: {
        special: 'Special header value',
        authorization: `Bearer ${BStore.get('token') || ''}`,
      },
    }
  },
  // the default:
  exchanges: defaultExchanges,
  // requestPolicy: 'network-only',
  // see https://formidable.com/open-source/urql/docs/basics/document-caching/#request-policies
  requestPolicy: 'cache-and-network',
  // the same as:
  // exchanges: [dedupExchange, cacheExchange, fetchExchange],
})

export default client
