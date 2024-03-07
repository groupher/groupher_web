import { useContext, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TPagedChangelogs, TResState } from '@/spec'

import { toJS } from '@/mobx'

type TRes = {
  resState: TResState
  pagedChangelogs: TPagedChangelogs
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const usePagedChangelogs = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const viewingCommunity = store.viewing.community.slug
  const curPageNumber = store.articles.pagedChangelogs.pageNumber

  const resState = useMemo(() => toJS(store.articles.resState), [viewingCommunity, curPageNumber])
  const pagedChangelogs = useMemo(
    () => toJS(store.articles.pagedChangelogs),
    [viewingCommunity, curPageNumber],
  )

  return {
    resState,
    pagedChangelogs,
  }
}

export default usePagedChangelogs
