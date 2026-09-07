import type { TStore } from './spec'

/** Reports whether the Dashboard shadow draft differs from its confirmed value. */
export const hasContentShadowPatch = (store: TStore): boolean => store.enabled !== store.original
