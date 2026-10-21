'use client'

import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
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
})

/** Owns editor-only selections and drafts outside the confirmed Dsb config store. */
export default function DsbEditorUiProvider({ children }: TProps) {
  const [store] = useState<TDsbEditorUiStore>(() => {
    const editorStore = proxy({
      ...makeInitialState(),
      patch(patch: Partial<TDsbEditorUiState>): void {
        Object.assign(editorStore, patch)
      },
    })
    return editorStore
  })

  const contextValue = useMemo(() => ({ store }), [store])

  return <DsbEditorUiContext.Provider value={contextValue}>{children}</DsbEditorUiContext.Provider>
}
