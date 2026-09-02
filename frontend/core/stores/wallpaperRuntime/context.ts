import { createContext } from 'react'

export type TWallpaperRuntimeMode = 'static' | 'editor'

export const WallpaperRuntimeContext = createContext<TWallpaperRuntimeMode>('static')

WallpaperRuntimeContext.displayName = 'WallpaperRuntime'
