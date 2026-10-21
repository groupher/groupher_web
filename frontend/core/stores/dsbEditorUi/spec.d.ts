import type { TDocFaqSaveZone, TNameAlias, TTag, TUser } from '~/spec'

export type TDsbEditorUiState = {
  editingTag: TTag | null
  settingTag: TTag | null
  editingAlias: TNameAlias | null
  docFaqSaveZone: TDocFaqSaveZone
  activeModerator: TUser | null
}

export type TDsbEditorUiStore = TDsbEditorUiState & {
  patch: (patch: Partial<TDsbEditorUiState>) => void
}

export type TDsbEditorUiContextValue = {
  store: TDsbEditorUiStore
}
