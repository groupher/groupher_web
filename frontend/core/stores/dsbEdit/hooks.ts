'use client'

import { use, useMemo } from 'react'
import { useSnapshot } from 'valtio'

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

    for (const key of Object.keys(store) as Array<keyof TDsbEditStore>) {
      if (typeof store[key] !== 'function') continue
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
  for (const key of Object.keys(store) as Array<keyof TDsbEditStore>) {
    if (typeof store[key] === 'function') {
      Object.defineProperty(result, key, {
        enumerable: true,
        value: actions[key as string],
      })
      continue
    }

    Object.defineProperty(result, key, {
      enumerable: true,
      get: () => snapshot[key],
    })
  }

  return result as Readonly<TDsbEditStore>
}
