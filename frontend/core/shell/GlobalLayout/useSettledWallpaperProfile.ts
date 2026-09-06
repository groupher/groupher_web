'use client'

import { useEffect, useState } from 'react'

import type { TWallpaperProfileSpec } from '~/lib/wallpaperProfiles'

export const WALLPAPER_PROFILE_SETTLE_MS = 150

type TRet = {
  profile: TWallpaperProfileSpec
  isSettled: boolean
}

/** Defers expensive GPU profile replacement until resize has stopped crossing a boundary. */
export default function useSettledWallpaperProfile(activeProfile: TWallpaperProfileSpec): TRet {
  const [profile, setProfile] = useState(activeProfile)

  useEffect(() => {
    if (profile.key === activeProfile.key) return

    const timer = window.setTimeout(() => {
      setProfile(activeProfile)
    }, WALLPAPER_PROFILE_SETTLE_MS)

    return () => window.clearTimeout(timer)
  }, [activeProfile, profile.key])

  return {
    profile,
    isSettled: profile.key === activeProfile.key,
  }
}
