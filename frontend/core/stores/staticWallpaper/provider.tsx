'use client'

import type { ReactNode } from 'react'

import type { TStaticWallpaper } from '~/spec'

import { StaticWallpaperContext } from './context'

type TProps = {
  children: ReactNode
  initData?: TStaticWallpaper | null
}

export default function StaticWallpaperProvider({ children, initData = null }: TProps) {
  return (
    <StaticWallpaperContext.Provider value={initData}>{children}</StaticWallpaperContext.Provider>
  )
}
