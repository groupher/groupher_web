'use client'

import { useLocation, useNavigate } from '@tanstack/react-router'

import { COMMUNITY_LAYOUT } from '~/const/layout'
import URL_PARAM from '~/const/url_param'
import useLayout from '~/hooks/useLayout'
import usePagedChangelogs from '~/hooks/usePagedChangelogs'
import useURLSearchParams from '~/hooks/useURLSearchParams'
import Pagi from '~/ui/Pagi'
import CursorPagination from '~/ui/Pagi/CursorPagination'
import PaginationError from '~/ui/Pagi/PaginationError'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

/** Renders the changelog surface inside the selected pagination provider. */
export default function ChangelogSurface() {
  const { communityLayout } = useLayout()
  const {
    pagedChangelogs,
    paginationApi,
    paginationMode,
    initialError,
    isRetryingInitial,
    retryInitial,
    hasNextPage,
    isFetchingNextPage,
    nextPageError,
    retryNextPage,
    fetchNextPage,
  } = usePagedChangelogs()
  const { pathname } = useLocation()
  const searchParams = useURLSearchParams()
  const navigate = useNavigate()

  const changePage = (page: number) => {
    const next = new URLSearchParams(searchParams.toString())
    if (page <= 1) next.delete(URL_PARAM.PAGE)
    else next.set(URL_PARAM.PAGE, String(page))
    const query = next.toString()
    void navigate({ to: (query ? `${pathname}?${query}` : pathname) as never })
  }

  return (
    <>
      {communityLayout === COMMUNITY_LAYOUT.HERO ? <ClassicLayout /> : <SimpleLayout />}
      {paginationApi === 'cursor' ? (
        <CursorPagination
          mode={paginationMode}
          hasNextPage={hasNextPage}
          isLoading={isFetchingNextPage}
          error={nextPageError}
          onRetry={() => void retryNextPage()}
          onLoadMore={() => void fetchNextPage()}
        />
      ) : (
        <Pagi {...pagedChangelogs} onChange={changePage} top={40} bottom={30} />
      )}
      {initialError && pagedChangelogs.entries.length === 0 && (
        <PaginationError isRetrying={isRetryingInitial} onRetry={() => void retryInitial()} />
      )}
    </>
  )
}
