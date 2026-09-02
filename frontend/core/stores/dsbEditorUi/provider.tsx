'use client'

import type { ReactNode } from 'react'
import { useMemo, useRef } from 'react'
import { proxy } from 'valtio'

import { DsbEditorUiContext } from './context'
import type { TDsbEditorUiState, TDsbEditorUiStore } from './spec'

type TProps = {
  children: ReactNode
}

const makeInitialState = (): TDsbEditorUiState => ({
  editingTag: null,
  settingTag: null,
  editingAlias: null,
  docFaqSaveZone: null,
  activeModerator: null,
  allModeratorRules: '{}',
  allRootRules: '{}',
})

/** Owns editor-only selections and drafts outside the confirmed Dsb config store. */
export default function DsbEditorUiProvider({ children }: TProps) {
  const storeRef = useRef<TDsbEditorUiStore | null>(null)

  storeRef.current ??= proxy({
    ...makeInitialState(),
    patch(patch: Partial<TDsbEditorUiState>): void {
      Object.assign(storeRef.current!, patch)
    },
  })

  const contextValue = useMemo(() => ({ store: storeRef.current! }), [])

  return <DsbEditorUiContext.Provider value={contextValue}>{children}</DsbEditorUiContext.Provider>
}
