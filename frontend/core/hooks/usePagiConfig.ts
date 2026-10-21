import { useMemo, useSyncExternalStore } from 'react'

import { toEffectivePagiConfig } from '~/lib/pagination/params'
import { readPagiMobileLayout } from '~/lib/pagination/viewport'
import type { TPagiPreference } from '~/spec'

const subscribe = () => () => {}
const serverSnapshot = () => null

/** Locks the entry layout per collection; hydration waits for a real viewport. */
export default function usePagiConfig(preference: TPagiPreference, scope: string) {
  const snapshot = useMemo(() => {
    // A new collection chooses again; resizing an active collection preserves its position.
    let layout: boolean | null = null
    return () => {
      layout ??= readPagiMobileLayout()
      return layout
    }
  }, [scope])
  const mobile = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  return { config: toEffectivePagiConfig(preference, mobile === true), ready: mobile !== null }
}
