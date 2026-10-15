'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { proxy } from 'valtio'

import { DsbShellUiContext } from './context'
import type { TDsbShellUi } from './spec'

type TProps = {
  children: ReactNode
}

export default function DsbShellUiProvider({ children }: TProps) {
  const [store] = useState<TDsbShellUi>(() => {
    const shellStore = proxy<TDsbShellUi>({
      submenuCollapsed: false,
      setSubmenuCollapsed(value: boolean) {
        shellStore.submenuCollapsed = value
      },
    })
    return shellStore
  })

  return <DsbShellUiContext.Provider value={store}>{children}</DsbShellUiContext.Provider>
}
