'use client'

import { type ReactNode, useEffect, useMemo, useRef } from 'react'

import type { TParseDashboard } from '~/spec'

import { createDsbEditStore } from '.'
import { DsbEditContext } from './context'
import type { TDsbEditContextValue } from './spec'

type TProps = {
  children: ReactNode
  initialData: TParseDashboard
}

export default function DsbEditProvider({ children, initialData }: TProps) {
  const editStoreRef = useRef<ReturnType<typeof createDsbEditStore> | null>(null)

  editStoreRef.current ??= createDsbEditStore(initialData.original)

  useEffect(() => {
    editStoreRef.current?.reconcileConfirmed(initialData.original)
  }, [initialData.original])

  const value = useMemo<TDsbEditContextValue>(
    () => ({
      editStore: editStoreRef.current!,
    }),
    [],
  )

  return <DsbEditContext.Provider value={value}>{children}</DsbEditContext.Provider>
}
