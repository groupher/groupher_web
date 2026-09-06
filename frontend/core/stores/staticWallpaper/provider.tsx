'use client'

import type { ReactNode } from 'react'

import type { TPublishedWallpaper } from '~/spec'

import { StaticWallpaperContext } from './context'

type TProps = {
  children: ReactNode
  initData?: TPublishedWallpaper | null
}

export default function StaticWallpaperProvider({ children, initData = null }: TProps) {
  return (
    <StaticWallpaperContext.Provider value={initData}>{children}</StaticWallpaperContext.Provider>
  )
}
