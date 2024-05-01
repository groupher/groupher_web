'use client'

/**
 * this is for Graphql feching data on page load
 */

import { FC, ReactNode, useMemo } from 'react'
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next'

import { makeOperation, makeResult } from '@urql/core'
import { filter, map, pipe, merge, mergeMap, fromValue, share, fromPromise } from 'wonka'

import { loadLocaleData2 } from '@/i18n'
import { GRAPHQL_ENDPOINT } from '@/config'

type TProps = {
  children: ReactNode
}

const fakeI18nExchange = ({ forward }) => {
  return (ops$) => {
    const sharedOps$ = share(ops$)

    const interceptedOps$ = pipe(
      sharedOps$,
      // @ts-ignore
      filter((operation) => operation.variables?.locale),
      mergeMap((operation) =>
        fromPromise(
          // @ts-ignore
          asyncResultFunction(operation.variables?.locale).then((result) =>
            // @ts-ignore
            makeResult(operation, { data: result }),
          ),
        ),
      ),
    )

    const forwardOps$ = pipe(
      sharedOps$,
      // @ts-ignore
      filter((operation) => !operation.variables?.locale),
      forward,
    )

    return merge([interceptedOps$, forwardOps$])
  }
}

// 这是一个示例的异步函数，它返回一个 Promise，表示异步的结果
function asyncResultFunction(locale) {
  console.log('## the locale to load: ', locale)

  return loadLocaleData2(locale)
}

const GraphQLProvider: FC<TProps> = ({ children }) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange()
    const client = createClient({
      url: GRAPHQL_ENDPOINT,
      // @ts-ignore
      exchanges: [cacheExchange, ssr, fakeI18nExchange, fetchExchange],
      suspense: true,

      fetchOptions: () => ({
        headers: {
          special: 'Special header value',
          authorization: '',
        },
      }),
    })

    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}

export default GraphQLProvider
