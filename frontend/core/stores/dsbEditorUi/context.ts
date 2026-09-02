'use client'

import { createContext } from 'react'

import type { TDsbEditorUiContextValue } from './spec'

export const DsbEditorUiContext = createContext<TDsbEditorUiContextValue | null>(null)
DsbEditorUiContext.displayName = 'DsbEditorUi'
