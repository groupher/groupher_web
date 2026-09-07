'use client'

import { useSyncExternalStore } from 'react'

import {
  resolveWallpaperProfile,
  wallpaperProfileSpec,
  type TWallpaperProfile,
  type TWallpaperProfileSpec,
} from '~/lib/wallpaperProfiles'

const SERVER_PROFILE: TWallpaperProfile = 'wide'

const subscribeViewport = (listener: () => void): (() => void) => {
  window.addEventListener('resize', listener)
  return () => window.removeEventListener('resize', listener)
}

const getClientProfile = (): TWallpaperProfile =>
  resolveWallpaperProfile(window.innerWidth, window.innerHeight)

const getServerProfile = (): TWallpaperProfile => SERVER_PROFILE

/** Resolves the same responsive Wallpaper profile selected by StaticWallpaper CSS. */
export default function useActiveWallpaperProfile(): TWallpaperProfileSpec {
  const profile = useSyncExternalStore(subscribeViewport, getClientProfile, getServerProfile)
  return wallpaperProfileSpec(profile)
}
