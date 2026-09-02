'use client'

import { createContext } from 'react'

import type { TDsbEditContextValue } from './spec'

export const DsbEditContext = createContext<TDsbEditContextValue | null>(null)
DsbEditContext.displayName = 'DsbEdit'
