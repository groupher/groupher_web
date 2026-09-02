'use client'

import { type ReactNode, useMemo, useState } from 'react'

import { CommunityViewportContext } from './context'

export default function CommunityViewportProvider({ children }: { children: ReactNode }) {
  const [inView, setInView] = useState(true)
  const value = useMemo(() => ({ inView, setInView }), [inView])

  return (
    <CommunityViewportContext.Provider value={value}>{children}</CommunityViewportContext.Provider>
  )
}
