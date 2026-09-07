'use client'

import { createContext } from 'react'

import type { TDsbShellUi } from './spec'

export const DsbShellUiContext = createContext<TDsbShellUi | null>(null)
DsbShellUiContext.displayName = 'DsbShellUi'
