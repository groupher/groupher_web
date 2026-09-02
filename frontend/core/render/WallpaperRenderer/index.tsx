'use client'

import { useCallback } from 'react'

import { useWallpaperBgRenderSpec } from '~/hooks/useWallpaper'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import { subscribeWallpaperPreview } from '~/lib/wallpaperPreview'
import BgRenderer from '~/render/BgRenderer'
import type { TBgPreviewSubscriber } from '~/render/BgRenderer/spec'

import type { TProps } from './spec'

export default function WallpaperRenderer({
  className,
  patternSize = DEFAULT_WALLPAPER_PATTERN_SIZE,
  renderSize,
  positioned = true,
  preferVgpu = false,
  textureScale = 1,
  onReady,
  onFailure,
}: TProps) {
  const renderSpec = useWallpaperBgRenderSpec()
  const previewSubscriber = useCallback<TBgPreviewSubscriber>(
    (listener) => subscribeWallpaperPreview(listener),
    [],
  )

  return (
    <BgRenderer
      className={className}
      renderSpec={renderSpec}
      patternSize={patternSize}
      renderSize={renderSize}
      positioned={positioned}
      preferVgpu={preferVgpu}
      previewSubscriber={previewSubscriber}
      textureScale={textureScale}
      onReady={onReady}
      onFailure={onFailure}
    />
  )
}
