import { clone, equals } from 'ramda'
import { proxy } from 'valtio'

import { WALLPAPER_SAVABLE_THEME_STATE_KEYS } from './constant'
import { initState } from './helper'
import type { TInit, TStore } from './spec'

export default (init: TInit = {}): TStore => {
  const initialState = initState(init)
  const initialStore: TStore = {
    // Keep the saved baseline isolated from live nested edits used by diff patches.
    original: clone(initialState),
    ...clone(initialState),

    commit: (patch: Partial<TStore>): void => {
      const { light, dark, ...rest } = patch

      Object.assign(store, rest)
      if (light) Object.assign(store.light, light)
      if (dark) Object.assign(store.dark, dark)
    },
    acceptSubmitted: (submitted): void => {
      for (const theme of ['light', 'dark'] as const) {
        const submittedTheme = submitted[theme]
        if (!submittedTheme) continue

        for (const key of WALLPAPER_SAVABLE_THEME_STATE_KEYS) {
          if (!(key in submittedTheme)) continue

          const submittedValue = submittedTheme[key]
          const currentValue = store[theme][key]

          // A newer local edit may have landed while the request was in
          // flight. Confirm the submitted value as the baseline but preserve
          // that newer current value instead of overwriting it.
          if (equals(currentValue, submittedValue)) {
            store[theme][key] = clone(submittedValue) as never
          }
          store.original[theme][key] = clone(submittedValue) as never
        }
      }
    },
    reconcileConfirmed: (confirmed: TInit): void => {
      const next = initState(confirmed)
      for (const theme of ['light', 'dark'] as const) {
        for (const key of Object.keys(next[theme]) as Array<keyof TStore[typeof theme]>) {
          const untouched = equals(store[theme][key], store.original[theme][key])
          if (untouched) store[theme][key] = clone(next[theme][key]) as never
          store.original[theme][key] = clone(next[theme][key]) as never
        }
      }
    },
  }

  const store = proxy(initialStore)
  return store
}
