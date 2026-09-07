'use client'

import { use, useCallback } from 'react'
import { useSnapshot } from 'valtio'

import type { TDocFaqSaveZone, TNameAlias, TTag, TUser } from '~/spec'

import { DsbEditorUiContext } from './context'
import type { TDsbEditorUiState, TDsbEditorUiStore } from './spec'

const useEditorUiStore = (): TDsbEditorUiStore => {
  const context = use(DsbEditorUiContext)
  if (!context) throw new Error('Dsb editor UI hooks must be used within a DsbEditorUiProvider')
  return context.store
}

const usePatchEditorUi = (store: TDsbEditorUiStore) =>
  useCallback((patch: Partial<TDsbEditorUiState>): void => store.patch(patch), [store])

/** Subscribes only to tag-editor session state. */
export const useTagEditorUi = () => {
  const store = useEditorUiStore()
  const snapshot = useSnapshot(store)
  return {
    editingTag: snapshot.editingTag as TTag | null,
    settingTag: snapshot.settingTag as TTag | null,
    patch: usePatchEditorUi(store),
  }
}

/** Subscribes only to alias-editor session state. */
export const useAliasEditorUi = () => {
  const store = useEditorUiStore()
  const snapshot = useSnapshot(store)
  return {
    editingAlias: snapshot.editingAlias as TNameAlias | null,
    patch: usePatchEditorUi(store),
  }
}

/** Subscribes only to FAQ-editor session state. */
export const useFaqEditorUi = () => {
  const store = useEditorUiStore()
  const snapshot = useSnapshot(store)
  return {
    docFaqSaveZone: snapshot.docFaqSaveZone as TDocFaqSaveZone,
    patch: usePatchEditorUi(store),
  }
}

/** Subscribes only to moderator-editor session state. */
export const useModeratorEditorUi = () => {
  const store = useEditorUiStore()
  const snapshot = useSnapshot(store)
  return {
    activeModerator: snapshot.activeModerator as TUser | null,
    allModeratorRules: snapshot.allModeratorRules,
    allRootRules: snapshot.allRootRules,
    patch: usePatchEditorUi(store),
  }
}
