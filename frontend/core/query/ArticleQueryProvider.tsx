'use client'

import { useQuery } from '@tanstack/react-query'
import { createContext, type ReactNode, useContext, useMemo } from 'react'

import type { TArticle, TThread } from '~/spec'
import useAccount from '~/stores/account/hooks'

import { Q } from './client'
import type { TViewerArticleRef } from './viewer'

type TValue = {
  article: TArticle | null
  community: string
  innerId: string
  thread: TThread
}

const ArticleQueryContext = createContext<TValue | null>(null)

/** Reads the strict article server-state context supplied by the route query boundary. */
export const useArticleQueryContext = (): TValue | null => useContext(ArticleQueryContext)

export default function ArticleQueryProvider({
  children,
  community,
  innerId,
  thread,
  initialArticle,
}: {
  children: ReactNode
  community: string
  innerId: string | number
  thread: TThread
  initialArticle?: TArticle | null
}) {
  const account = useAccount()
  const articleQuery = useQuery({
    ...Q.article.detail(community, thread, innerId),
    initialData: initialArticle || undefined,
  })
  const viewerScope = account.user?.login || ''
  const articleRef = {
    community,
    thread,
    innerId: String(innerId),
  } satisfies TViewerArticleRef
  const viewerQuery = useQuery(Q.viewer.articleStates(viewerScope, [articleRef]))
  const article = useMemo(() => {
    if (!articleQuery.data) return null
    const key = `${community}:${thread}:${String(innerId)}`
    const viewerState = viewerQuery.data?.[key]
    return viewerState ? ({ ...articleQuery.data, ...viewerState } as TArticle) : articleQuery.data
  }, [articleQuery.data, community, innerId, thread, viewerQuery.data])
  const value = useMemo(
    () => ({
      article,
      community,
      innerId: String(innerId),
      thread,
    }),
    [article, community, innerId, thread],
  )

  return <ArticleQueryContext.Provider value={value}>{children}</ArticleQueryContext.Provider>
}
