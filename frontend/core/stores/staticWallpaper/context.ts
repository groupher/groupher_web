import { createContext } from 'react'

import type { TPublishedWallpaper } from '~/spec'

export const StaticWallpaperContext = createContext<TPublishedWallpaper | null>(null)

StaticWallpaperContext.displayName = 'StaticWallpaper'
