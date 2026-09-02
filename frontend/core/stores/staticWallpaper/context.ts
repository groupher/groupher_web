import { createContext } from 'react'

import type { TStaticWallpaper } from '~/spec'

export const StaticWallpaperContext = createContext<TStaticWallpaper | null>(null)

StaticWallpaperContext.displayName = 'StaticWallpaper'
