'use client'

import { createContext } from 'react'

import type { TInit, TStore } from './spec'

export const StoreContext = createContext<TStore | null>(null)
StoreContext.displayName = 'Theme'

/** Immutable request seed used while each streamed boundary hydrates. */
export const ServerThemeContext = createContext<TInit | null>(null)
ServerThemeContext.displayName = 'ServerTheme'
