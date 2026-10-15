'use client'

import { type ReactNode, useEffect, useMemo, useState } from 'react'

import type { TParseDashboard } from '~/spec'

import { createDsbEditStore } from '.'
import { DsbEditContext } from './context'
import type { TDsbEditContextValue } from './spec'

type TProps = {
  children: ReactNode
  initialData: TParseDashboard
}

export default function DsbEditProvider({ children, initialData }: TProps) {
  const [editStore] = useState(() => createDsbEditStore(initialData.original))

  useEffect(() => {
    editStore.reconcileConfirmed(initialData.original)
  }, [editStore, initialData.original])

  const value = useMemo<TDsbEditContextValue>(
    () => ({
      editStore,
    }),
    [editStore],
  )

  return <DsbEditContext.Provider value={value}>{children}</DsbEditContext.Provider>
}
