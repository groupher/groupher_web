'use client'

import { use } from 'react'
import { useSnapshot } from 'valtio'

import { DsbShellUiContext } from './context'

/** Reads Dash-only shell UI state such as submenu collapse. */
export default function useDsbShellUi() {
  const context = use(DsbShellUiContext)
  if (!context) throw new Error('useDsbShellUi must be used within a DsbShellUiProvider')

  return useSnapshot(context)
}
