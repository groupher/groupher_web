'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/**
 * Returns false for SSR and each boundary's hydration pass, then true after
 * React commits that boundary. The empty subscription is intentional: React
 * schedules the one client re-render because the server and client snapshots
 * differ. Keep this private to hydration-safe infrastructure; it is not a
 * general-purpose mounted-state hook.
 */
export default function useHydrationLatch(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}
