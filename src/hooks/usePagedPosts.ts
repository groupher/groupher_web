import { useContext, useMemo } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TPagedPosts, TResState } from '@/spec'

import { toJS } from '@/mobx'

type TRes = {
  resState: TResState
  pagedPosts: TPagedPosts
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const usePagedPosts = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  const viewingCommunity = 'home' // store.viewing.community.slug
  const curPageNumber = 1 // store.articles.pagedPosts.pageNumber
  // console.log('## viewingCommunityd: ', viewingCommunity)
  // console.log('## curPageNumber: ', curPageNumber)

  const resState = useMemo(() => toJS(store.articles.resState), [viewingCommunity, curPageNumber])
  const pagedPosts = useMemo(
    () => toJS(store.articles.pagedPosts),
    [viewingCommunity, curPageNumber],
  )

  return {
    resState,
    pagedPosts,
  }
}

export default usePagedPosts
