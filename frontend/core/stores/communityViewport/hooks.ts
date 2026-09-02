'use client'

import { use, useCallback } from 'react'

import { CommunityViewportContext } from './context'

/** Reads and updates the client-only Community digest viewport state. */
export default function useCommunityViewport() {
  const context = use(CommunityViewportContext)
  if (!context)
    throw new Error('useCommunityViewport must be used within CommunityViewportProvider')

  return {
    enterView: useCallback(() => context.setInView(true), [context.setInView]),
    leaveView: useCallback(() => context.setInView(false), [context.setInView]),
    inView: context.inView,
  }
}
