import { proxy } from 'valtio'

import type { TContentShadowInit, TStore } from './spec'

/** Builds the normalized Dashboard shadow state from confirmed data or defaults. */
export const initState = (init: TContentShadowInit = false): boolean => init ?? false

export default (init: TContentShadowInit = false): TStore => {
  const initial = initState(init)
  const store = proxy<TStore>({
    enabled: initial,
    original: initial,
    commit: (enabled: boolean) => {
      store.enabled = enabled
    },
    acceptSubmitted: (submitted: boolean) => {
      store.original = submitted
    },
    reconcileConfirmed: (confirmed: TContentShadowInit) => {
      const next = initState(confirmed)
      if (store.enabled === store.original) store.enabled = next
      store.original = next
    },
  })

  return store
}
