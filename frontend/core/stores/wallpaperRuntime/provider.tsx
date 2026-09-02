'use client'

import type { ReactNode } from 'react'

import { WallpaperRuntimeContext, type TWallpaperRuntimeMode } from './context'

type TProps = {
  children: ReactNode
  mode?: TWallpaperRuntimeMode
}

export default function WallpaperRuntimeProvider({ children, mode = 'static' }: TProps) {
  return (
    <WallpaperRuntimeContext.Provider value={mode}>{children}</WallpaperRuntimeContext.Provider>
  )
}
