import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TPagedPosts, TResState } from '@/spec'

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

  return {
    resState: store.articles.resState,
    pagedPosts: store.articles.pagedPosts,
  }
}

export default usePagedPosts
