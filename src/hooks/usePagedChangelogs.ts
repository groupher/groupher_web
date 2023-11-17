import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TPagedChangelogs, TResState } from '@/spec'

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

  return {
    resState: store.articles.resState,
    pagedChangelogs: store.articles.pagedChangelogs,
  }
}

export default usePagedChangelogs
