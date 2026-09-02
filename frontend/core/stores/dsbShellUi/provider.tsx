'use client'

import type { ReactNode } from 'react'
import { useRef } from 'react'
import { proxy } from 'valtio'

import { DsbShellUiContext } from './context'

type TProps = {
  children: ReactNode
}

export default function DsbShellUiProvider({ children }: TProps) {
  const storeRef = useRef<{
    submenuCollapsed: boolean
    setSubmenuCollapsed: (value: boolean) => void
  } | null>(null)

  storeRef.current ??= proxy({
    submenuCollapsed: false,
    setSubmenuCollapsed(value: boolean) {
      storeRef.current!.submenuCollapsed = value
    },
  })

  return (
    <DsbShellUiContext.Provider value={storeRef.current}>{children}</DsbShellUiContext.Provider>
  )
}
