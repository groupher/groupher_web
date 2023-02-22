import { merge, toUpper, clone } from 'ramda'
import { createClient } from 'urql/core'

import { GRAPHQL_ENDPOINT, PAGE_SIZE } from '@/config'
import { isString } from './validator'

// NOTE the client with jwt info is used for getInitialProps for SSR
// to load user related data
export const makeGQClient = (token: string): any => {
  const client = createClient({
    url: GRAPHQL_ENDPOINT,
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })

  // see https://formidable.com/open-source/urql/docs/basics/core/
  return {
    request: (schema, query) =>
      client
        .query(schema, query)
        .toPromise()
        .then((res) => res.data),
  }
}

export const makeGithubExplore = (GRAPHQL_ENDPOINT: string, token: string): any => {
  const client = createClient({
    url: GRAPHQL_ENDPOINT,
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })

  return client
}

export const pagedFilter = (page, options = {}): Record<string, any> =>
  merge({ page, size: PAGE_SIZE.D }, options)

/*
 * map value(string) to UPPER case for server absinthe-atom format
 * e.p: is server required :post, front-end should pass "POST"
 */
export const atomizeValues = (_obj: Record<string, any>): Record<string, string> => {
  const obj = clone(_obj)

  Object.keys(obj).forEach((k) => {
    if (isString(obj[k])) {
      obj[k] = toUpper(obj[k])
    }
  })

  return obj
}

// NOTE: this is a simple hack for send parallel requests in rxjs
// in rxjs, if you want to send parallel request you should use complex method
// like forkJoin .. which need to refactor whole sr71 part
// currently the simple later is fine
export const later = (func, time = 200): ReturnType<typeof setTimeout> => {
  return setTimeout(func, time)
}
