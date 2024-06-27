import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import type { TPagedPosts, TResState } from '~/spec'

type TRes = {
  todo: TPagedPosts
  wip: TPagedPosts
  done: TPagedPosts
  resState: TResState
}

/**
 * NOTE: should use observer to wrap the component who use this hook
 */
const useKanbanPosts = (): TRes => {
  const { store } = useContext(MobXProviderContext)

  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }

  return {
    resState: store.articles.resState,
    todo: store.articles.todo,
    wip: store.articles.wip,
    done: store.articles.done,
  }
}

export default useKanbanPosts
