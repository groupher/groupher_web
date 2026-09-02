'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cnMerge } from '~/css'
import type { TBgRenderSpec } from '~/lib/bg'

import BgLayer from './BgLayer'
import { getVisualIdentity, preloadImage, shouldCrossfade } from './helper'
import useSalon from './salon'
import type { TBgLayerHandle, TProps } from './spec'

/**
 * Shared runtime renderer for Bg backgrounds.
 *
 * This remains the live renderer for Wallpaper editor previews and CoverEditor
 * runtime rendering. Published site shells use `StaticWallpaper` instead. It
 * receives a render spec instead of reading module stores, so business adapters
 * stay outside the common layer.
 *
 * @example
 * const renderSpec = composeBgRenderSpec(bg)
 * return <BgRenderer renderSpec={renderSpec} />
 */
export default function BgRenderer({
  className,
  renderSpec,
  patternSize = 'auto',
  renderSize,
  positioned = true,
  preferVgpu = false,
  previewSubscriber,
  textureScale = 1,
  onReady,
  onFailure,
}: TProps) {
  const s = useSalon()
  // Transition state: prop changes are synchronized by the effect below, with optional crossfade/preload.
  const [activeSpec, setActiveSpec] = useState<TBgRenderSpec>(renderSpec)
  const [exitingSpec, setExitingSpec] = useState<TBgRenderSpec | null>(null)
  const committedSpecRef = useRef(renderSpec)
  const activeSpecRef = useRef(renderSpec)
  const activeLayerRef = useRef<TBgLayerHandle | null>(null)
  const previewVersionRef = useRef(0)
  const previewSpecRef = useRef<TBgRenderSpec | null>(null)
  const transitionTokenRef = useRef(0)

  const applySpec = useCallback((nextSpec: TBgRenderSpec) => {
    const previousSpec = activeSpecRef.current
    const shouldAnimate = shouldCrossfade(previousSpec, nextSpec)
    const transitionToken = transitionTokenRef.current + 1
    transitionTokenRef.current = transitionToken

    if (!shouldAnimate) {
      activeSpecRef.current = nextSpec
      setActiveSpec(nextSpec)
      setExitingSpec(null)
      return
    }

    preloadImage(nextSpec).then(() => {
      if (transitionToken !== transitionTokenRef.current) return

      setExitingSpec(previousSpec)
      activeSpecRef.current = nextSpec
      setActiveSpec(nextSpec)
    })
  }, [])

  useEffect(() => {
    committedSpecRef.current = renderSpec

    // A debounced control commit can arrive immediately after its final
    // preview frame. Keep the imperative frame as the active visual and only
    // update the committed reference in that case.
    if (
      previewSpecRef.current &&
      JSON.stringify(previewSpecRef.current) === JSON.stringify(renderSpec)
    ) {
      activeSpecRef.current = renderSpec
      previewSpecRef.current = null
      return
    }

    previewSpecRef.current = null
    applySpec(renderSpec)
  }, [applySpec, renderSpec])

  useEffect(() => {
    if (!previewSubscriber) return

    return previewSubscriber((frame) => {
      if (frame.version <= previewVersionRef.current) return

      previewVersionRef.current = frame.version
      previewSpecRef.current = frame.renderSpec
      activeLayerRef.current?.updatePreviewFrame(frame.renderSpec ?? committedSpecRef.current)
    })
  }, [applySpec, previewSubscriber])

  return (
    <div
      className={cnMerge(positioned && s.wrapperPositioned, s.wrapper, className)}
      aria-hidden='true'
    >
      <BgLayer
        ref={activeLayerRef}
        renderSpec={activeSpec}
        patternSize={patternSize}
        renderSize={renderSize}
        preferVgpu={preferVgpu}
        textureScale={textureScale}
        onReady={onReady}
        onFailure={onFailure}
      />
      {exitingSpec && (
        <BgLayer
          key={getVisualIdentity(exitingSpec)}
          renderSpec={exitingSpec}
          exiting
          patternSize={patternSize}
          renderSize={renderSize}
          preferVgpu={preferVgpu}
          textureScale={textureScale}
          onExited={() => setExitingSpec(null)}
        />
      )}
    </div>
  )
}
