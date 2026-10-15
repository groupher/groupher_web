import { proxy } from 'valtio'

import type { TInit, TStore } from './spec'

/** Creates an isolated reactive store for Article presentation state and partial updates. */
export default function createArticleStore(init: TInit = {}): TStore {
  const initialStore: TStore = {
    // docs
    isFAQArticleLayout: true,
    ...init,

    commit: (patch: Partial<TStore>): void => {
      Object.assign(store, patch)
    },
  }

  const store = proxy(initialStore)
  return store
}
