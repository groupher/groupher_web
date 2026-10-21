import { useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { type PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'

import URL_PARAM from '~/const/url_param'
import { recordPaginationEvent } from '~/lib/pagination/telemetry'
import PaginationError from '~/ui/Pagi/PaginationError'

import { refreshArticleBootstrap, resetArticleSurface } from '../query/articleSurface'

type TProps = PropsWithChildren<{
  community: string
  surface: 'posts' | 'changelogs'
  recovery: 'bootstrap' | 'list' | null
}>

/** Keeps the Community shell hydrated while refreshing config before any list query can mount. */
export default function ArticlePageBoundary({ children, community, surface, recovery }: TProps) {
  const client = useQueryClient()
  const [ready, setReady] = useState(!recovery)
  const [isRetrying, setRetrying] = useState(false)
  const { pathname, searchStr } = useLocation()
  const navigate = useNavigate()
  const inFlight = useRef(false)
  const mounted = useRef(false)
  const recover = useCallback(async () => {
    if (inFlight.current) return
    if (recovery === 'list') {
      setReady(true)
      return
    }
    inFlight.current = true
    setRetrying(true)
    try {
      await refreshArticleBootstrap(client, community)
      if (!mounted.current) return
      resetArticleSurface(client, community, surface)
      const search = new URLSearchParams(searchStr)
      if (search.has(URL_PARAM.PAGE)) {
        search.delete(URL_PARAM.PAGE)
        const query = search.toString()
        await navigate({ to: (query ? `${pathname}?${query}` : pathname) as never, replace: true })
      }
      if (mounted.current) setReady(true)
    } catch {
      recordPaginationEvent({ surface, event: 'bootstrap_recovery' })
    } finally {
      inFlight.current = false
      if (mounted.current) setRetrying(false)
    }
  }, [client, community, surface, navigate, pathname, searchStr, recovery])
  useEffect(() => {
    mounted.current = true
    if (recovery === 'bootstrap') void recover()
    return () => {
      mounted.current = false
    }
  }, [recovery, recover])

  return ready ? (
    children
  ) : (
    <PaginationError isRetrying={isRetrying} onRetry={() => void recover()} />
  )
}
