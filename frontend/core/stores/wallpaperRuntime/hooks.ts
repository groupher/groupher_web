'use client'

import { use } from 'react'

import { WallpaperRuntimeContext } from './context'

export default function useWallpaperRuntimeMode() {
  return use(WallpaperRuntimeContext)
}
