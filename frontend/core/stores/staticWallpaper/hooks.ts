'use client'

import { use } from 'react'

import { StaticWallpaperContext } from './context'

export default function useStaticWallpaper() {
  return use(StaticWallpaperContext)
}
