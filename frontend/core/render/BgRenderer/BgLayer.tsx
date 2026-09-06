'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { cn } from '~/css'

import { FADE_MS } from './constant'
import { getFallbackStyle, getFilterLayerStyle, getPatternLayerStyle } from './helper'
import { createBgRendererAdapter } from './renderer'
import type { TBgRendererEngine, TBgRendererFailure } from './renderer'
import useSalon from './salon'
import type { TBgLayerHandle, TBgLayerProps } from './spec'

/**
 * Renders one visual layer for a resolved Bg render spec.
 *
 * The layer owns WebGL lifecycle, CSS fallback, filter, and pattern overlay. The
 * parent renderer may keep two layers mounted during crossfade transitions.
 */
const BgLayer = forwardRef<TBgLayerHandle, TBgLayerProps>(function BgLayer(
  {
    className,
    renderSpec,
    exiting = false,
    patternSize,
    renderSize,
    renderLogicalSize,
    preferVgpu,
    textureScale,
    onExited,
    onReady,
    onFailure,
  },
  ref,
) {
  const s = useSalon()
  const layerRef = useRef<HTMLDivElement | null>(null)
  const fallbackRef = useRef<HTMLDivElement | null>(null)
  const patternRef = useRef<HTMLDivElement | null>(null)
  const webglCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const vgpuCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const rendererRef = useRef<ReturnType<typeof createBgRendererAdapter>>(null)
  const renderSpecRef = useRef(renderSpec)
  const previewSpecRef = useRef(renderSpec)
  const [fadeOut, setFadeOut] = useState(false)
  const [engine, setEngine] = useState<TBgRendererEngine>('webgl')
  const [failure, setFailure] = useState<TBgRendererFailure | null>(null)
  const engineRef = useRef(engine)

  useEffect(() => {
    engineRef.current = engine
  }, [engine])

  const handleFailure = useCallback(
    (nextFailure: TBgRendererFailure): void => {
      setFailure(nextFailure)
      onFailure?.(nextFailure)
    },
    [onFailure],
  )

  useImperativeHandle(
    ref,
    () => ({
      updatePreviewFrame: (nextSpec) => {
        const previousSpec = previewSpecRef.current
        const renderer = rendererRef.current
        renderer?.updatePreviewFrame(nextSpec)
        if (
          layerRef.current &&
          (previousSpec.filter !== nextSpec.filter ||
            previousSpec.blurIntensity !== nextSpec.blurIntensity ||
            previousSpec.brightness !== nextSpec.brightness ||
            previousSpec.saturation !== nextSpec.saturation)
        ) {
          layerRef.current.style.filter = String(
            getFilterLayerStyle(nextSpec, engine).filter ?? 'none',
          )
        }
        if (
          (!renderer || !renderer.isCanvasActive()) &&
          fallbackRef.current &&
          previousSpec.background !== nextSpec.background
        ) {
          fallbackRef.current.style.background = nextSpec.background
        }
        if (patternRef.current) {
          if (previousSpec.patternColor !== nextSpec.patternColor) {
            patternRef.current.style.backgroundColor = nextSpec.patternColor
          }
          if (previousSpec.patternOpacity !== nextSpec.patternOpacity) {
            patternRef.current.style.opacity = String(nextSpec.patternOpacity)
          }
          if (previousSpec.patternImage !== nextSpec.patternImage) {
            patternRef.current.style.maskImage = `url(${nextSpec.patternImage})`
            patternRef.current.style.webkitMaskImage = `url(${nextSpec.patternImage})`
          }
        }
        previewSpecRef.current = nextSpec
      },
    }),
    [engine],
  )

  useEffect(() => {
    renderSpecRef.current = renderSpec
    previewSpecRef.current = renderSpec
    rendererRef.current?.update(renderSpec)
  }, [renderSpec])

  useEffect(() => {
    const webglCanvas = webglCanvasRef.current
    const vgpuCanvas = vgpuCanvasRef.current
    if (!webglCanvas || !vgpuCanvas) return

    const mountRenderer = (): void => {
      rendererRef.current?.destroy()
      rendererRef.current = createBgRendererAdapter(
        webglCanvas,
        vgpuCanvas,
        renderSpecRef.current,
        textureScale,
        preferVgpu,
        setEngine,
        handleFailure,
        patternSize,
        renderSize,
        renderLogicalSize,
      )
    }

    const handleContextLost = (event: Event): void => {
      event.preventDefault()
      rendererRef.current?.handleWebglContextLost()
      if (engineRef.current === 'webgl') {
        handleFailure({
          stage: 'context-loss',
          error: new Error('BG_WEBGL_CONTEXT_LOST: WebGL context was lost'),
        })
      }
    }
    const handleContextRestored = (): void => {
      rendererRef.current?.handleWebglContextRestored()
      setFailure((current) => (current?.stage === 'context-loss' ? null : current))
    }

    mountRenderer()
    webglCanvas.addEventListener('webglcontextlost', handleContextLost)
    webglCanvas.addEventListener('webglcontextrestored', handleContextRestored)

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => rendererRef.current?.resize())
    resizeObserver?.observe(webglCanvas)

    const handleWindowResize = (): void => rendererRef.current?.resize()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', handleWindowResize)
      webglCanvas.removeEventListener('webglcontextlost', handleContextLost)
      webglCanvas.removeEventListener('webglcontextrestored', handleContextRestored)
      rendererRef.current?.destroy()
      rendererRef.current = null
    }
  }, [handleFailure, patternSize, preferVgpu, renderLogicalSize, renderSize, textureScale])

  useEffect(() => {
    if (failure || !rendererRef.current?.isCanvasActive() || (preferVgpu && engine !== 'webgpu')) {
      return
    }

    // Renderer construction may be synchronous, but the first visible paint is
    // not observable until the next frame. This is the hand-off signal used by
    // the editor to fade out its SSR/static layer.
    const frame = window.requestAnimationFrame(() => {
      if (!failure && rendererRef.current?.isCanvasActive()) onReady?.()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [engine, failure, onReady, preferVgpu])

  useEffect(() => {
    if (!exiting) return

    const frame = window.requestAnimationFrame(() => setFadeOut(true))
    const timer = window.setTimeout(() => onExited?.(), FADE_MS)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [exiting, onExited])

  const patternStyle = getPatternLayerStyle(renderSpec, patternSize)

  return (
    <div
      ref={layerRef}
      className={cn(s.layer, exiting && (fadeOut ? s.layerFadeOut : s.layerFadeIn), className)}
      data-bg-renderer-error={failure?.error.message}
      data-bg-renderer-failure-stage={failure?.stage}
      style={getFilterLayerStyle(renderSpec, engine)}
    >
      {engine !== 'failed' && (
        <div ref={fallbackRef} className={s.fallback} style={getFallbackStyle(renderSpec)} />
      )}
      <canvas
        ref={webglCanvasRef}
        className={cn(s.canvas, engine !== 'webgl' && s.canvasHidden)}
        data-bg-renderer={engine === 'webgl' ? 'active' : 'standby'}
        data-bg-renderer-engine='webgl'
        style={
          renderSize || renderLogicalSize
            ? { objectFit: 'cover', objectPosition: 'center' }
            : undefined
        }
      />
      <canvas
        ref={vgpuCanvasRef}
        className={cn(s.canvas, engine !== 'webgpu' && s.canvasHidden)}
        data-bg-renderer={engine === 'webgpu' ? 'active' : 'standby'}
        data-bg-renderer-engine='webgpu'
        style={
          renderSize || renderLogicalSize
            ? { objectFit: 'cover', objectPosition: 'center' }
            : undefined
        }
      />
      {engine === 'webgl' && renderSpec.patternImage && (
        <div ref={patternRef} className={s.pattern} style={patternStyle} />
      )}
    </div>
  )
})

export default BgLayer
