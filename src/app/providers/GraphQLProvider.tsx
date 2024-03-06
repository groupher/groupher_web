'use client'

/**
 * this is for Graphql feching data on page load
 */

import { FC, ReactNode, useMemo } from 'react'
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next'

import { GRAPHQL_ENDPOINT } from '@/config'

type TProps = {
  children: ReactNode
}

const GraphQLProvider: FC<TProps> = ({ children }) => {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange()
    const client = createClient({
      url: GRAPHQL_ENDPOINT,
      exchanges: [cacheExchange, ssr, fetchExchange],
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
