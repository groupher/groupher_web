'use client'

import { use, useMemo } from 'react'
import { useSnapshot } from 'valtio'

import { DSB_EDIT_ACTION_KEYS, DSB_EDIT_STATE_KEYS } from './constants'
import { DsbEditContext } from './context'
import type { TDsbEditStore } from './spec'

type TFunc = (...args: unknown[]) => unknown

/** Returns the stable editable store for callbacks that must read the latest draft. */
export const useDsbEditStore = (): TDsbEditStore => {
  const context = use(DsbEditContext)
  if (!context) throw new Error('useDsbEditStore must be used within a DsbEditProvider')
  return context.editStore
}

/** Reads the current Dash editing session and its reconcile actions. */
export default function useDsbEdit(): Readonly<TDsbEditStore> {
  const store = useDsbEditStore()
  const snapshot = useSnapshot(store)
  const actions = useMemo(() => {
    const stableActions: Record<string, TFunc> = {}

    for (const key of DSB_EDIT_ACTION_KEYS) {
      stableActions[key as string] = (...args: unknown[]) => {
        const action = store[key]
        return typeof action === 'function' ? (action as TFunc)(...args) : undefined
      }
    }

    return stableActions
  }, [store])
  const result = {} as Record<string, unknown>

  // Lazy getters preserve Valtio's field-level tracking. Eager snapshot spread
  // would subscribe every Dashboard editor to every top-level config field.
  for (const key of DSB_EDIT_STATE_KEYS) {
    Object.defineProperty(result, key, {
      enumerable: true,
      get: () => snapshot[key],
    })
  }

  for (const key of DSB_EDIT_ACTION_KEYS) {
    Object.defineProperty(result, key, {
      enumerable: true,
      value: actions[key],
    })
  }

  return result as Readonly<TDsbEditStore>
}
