import type { TBgRenderSpec } from '~/lib/bg'

import { isVgpuWallpaperSpec } from './vgpu/eligibility'
import { createBgWebglRenderer } from './webgl'

const VGPU_RUNTIME_LOAD_TIMEOUT_MS = 10_000

export type TBgRendererEngine = 'failed' | 'webgl' | 'webgpu'
export type TBgRendererFailureStage =
  | 'capability-check'
  | 'context-loss'
  | 'runtime-load'
  | 'adapter-init'
  | 'gpu-run'

export type TBgRendererFailure = {
  error: Error
  stage: TBgRendererFailureStage
}

export type TBgRendererAdapter = {
  update: (renderSpec: TBgRenderSpec) => void
  updatePreviewFrame: (renderSpec: TBgRenderSpec) => void
  isCanvasActive: () => boolean
  resize: () => void
  handleWebglContextLost: () => void
  handleWebglContextRestored: () => void
  destroy: () => void
}

type TVgpuRuntime = typeof import('./vgpu/renderer')

const loadVgpuRuntime = async (): Promise<TVgpuRuntime> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const importPromise = import('./vgpu/renderer')
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(
        new Error(
          `BG_VGPU_RUNTIME_LOAD_TIMEOUT: runtime chunk exceeded ${VGPU_RUNTIME_LOAD_TIMEOUT_MS}ms`,
        ),
      )
    }, VGPU_RUNTIME_LOAD_TIMEOUT_MS)
  })

  try {
    return await Promise.race([importPromise, timeoutPromise])
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
    // import() cannot be aborted. The runtime module has no top-level GPU side effects.
  }
}

class BgRendererAdapter implements TBgRendererAdapter {
  private readonly webglCanvas: HTMLCanvasElement
  private readonly vgpuCanvas: HTMLCanvasElement
  private readonly textureScale: number
  private readonly renderSize: readonly [number, number] | undefined
  private readonly patternSize: string
  private readonly preferVgpu: boolean
  private readonly onEngineChange: (engine: TBgRendererEngine) => void
  private readonly onFailure: (failure: TBgRendererFailure) => void
  private webglRenderer: ReturnType<typeof createBgWebglRenderer> = null
  private vgpuRenderer: Awaited<ReturnType<TVgpuRuntime['createBgVgpuRenderer']>> | null = null
  private renderSpec: TBgRenderSpec
  private activationToken = 0
  private loadingVgpu = false
  private failure: TBgRendererFailure | null = null
  private disposed = false
  private engine: TBgRendererEngine = 'webgl'

  constructor(
    webglCanvas: HTMLCanvasElement,
    vgpuCanvas: HTMLCanvasElement,
    renderSpec: TBgRenderSpec,
    textureScale: number,
    preferVgpu: boolean,
    onEngineChange: (engine: TBgRendererEngine) => void,
    onFailure: (failure: TBgRendererFailure) => void,
    patternSize = 'auto',
    renderSize?: readonly [number, number],
  ) {
    this.webglCanvas = webglCanvas
    this.vgpuCanvas = vgpuCanvas
    this.renderSpec = renderSpec
    this.textureScale = textureScale
    this.patternSize = patternSize
    this.renderSize = renderSize
    this.preferVgpu = preferVgpu
    this.onEngineChange = onEngineChange
    this.onFailure = onFailure
    this.mountWebgl()
    this.onEngineChange('webgl')
    this.update(renderSpec)
  }

  update(renderSpec: TBgRenderSpec): void {
    if (this.disposed || this.failure) return

    this.renderSpec = renderSpec
    const canUseVgpu = this.preferVgpu && isVgpuWallpaperSpec(renderSpec)

    if (!this.preferVgpu) {
      this.cancelVgpuActivation()
      this.vgpuRenderer?.destroy()
      this.vgpuRenderer = null
      this.mountWebgl()
      this.webglRenderer?.update(renderSpec)
      this.setEngine('webgl')
      return
    }

    if (!canUseVgpu) {
      this.failVgpu(
        'capability-check',
        new Error(
          'BG_VGPU_UNSUPPORTED_SPEC: Wallpaper spec is not supported by the WebGPU renderer',
        ),
      )
      return
    }

    if (typeof navigator === 'undefined' || !navigator.gpu) {
      this.failVgpu(
        'capability-check',
        new Error('BG_VGPU_UNAVAILABLE: current browser does not provide WebGPU'),
      )
      return
    }

    if (this.vgpuRenderer) {
      this.vgpuRenderer.update(renderSpec)
      return
    }

    this.mountWebgl()
    this.webglRenderer?.update(renderSpec)
    this.startVgpuActivation()
  }

  updatePreviewFrame(renderSpec: TBgRenderSpec): void {
    if (this.disposed || this.failure) return

    this.renderSpec = renderSpec
    if (this.vgpuRenderer) {
      this.vgpuRenderer.updatePreviewFrame(renderSpec)
      return
    }

    this.webglRenderer?.updatePreviewFrame(renderSpec)
  }

  isCanvasActive(): boolean {
    return this.webglRenderer !== null || this.vgpuRenderer !== null
  }

  resize(): void {
    this.webglRenderer?.resize()
    this.vgpuRenderer?.resize()
  }

  handleWebglContextLost(): void {
    this.webglRenderer?.destroy()
    this.webglRenderer = null
  }

  handleWebglContextRestored(): void {
    if (this.engine !== 'webgl' || this.disposed) return

    this.mountWebgl()
    this.webglRenderer?.update(this.renderSpec)
  }

  destroy(): void {
    if (this.disposed) return

    this.disposed = true
    this.cancelVgpuActivation()
    this.webglRenderer?.destroy()
    this.vgpuRenderer?.destroy()
    this.webglRenderer = null
    this.vgpuRenderer = null
  }

  private mountWebgl(): void {
    if (this.webglRenderer || this.disposed) return

    this.webglRenderer = createBgWebglRenderer(this.webglCanvas, this.textureScale, this.renderSize)
  }

  private startVgpuActivation(): void {
    if (this.loadingVgpu || this.failure || this.disposed) return

    this.loadingVgpu = true
    const token = this.activationToken + 1
    this.activationToken = token
    void this.activateVgpu(token)
  }

  private async activateVgpu(token: number): Promise<void> {
    let stage: TBgRendererFailureStage = 'runtime-load'

    try {
      const { createBgVgpuRenderer } = await loadVgpuRuntime()
      if (!this.isActivationCurrent(token)) return

      stage = 'adapter-init'
      const renderer = await createBgVgpuRenderer(
        this.vgpuCanvas,
        this.renderSpec,
        (error) => this.failVgpu('gpu-run', error),
        this.patternSize,
        this.renderSize,
      )
      if (!this.isActivationCurrent(token)) {
        renderer.destroy()
        return
      }

      renderer.update(this.renderSpec)
      this.vgpuRenderer = renderer
      this.webglRenderer?.destroy()
      this.webglRenderer = null
      this.setEngine('webgpu')
    } catch (error) {
      if (!this.isActivationCurrent(token)) return
      this.failVgpu(stage, error instanceof Error ? error : new Error(String(error)))
    } finally {
      if (token === this.activationToken) this.loadingVgpu = false
    }
  }

  private failVgpu(stage: TBgRendererFailureStage, error: Error): void {
    if (this.disposed || this.failure) return

    const failure = { stage, error }
    this.failure = failure
    this.cancelVgpuActivation()
    this.vgpuRenderer?.destroy()
    this.vgpuRenderer = null
    this.webglRenderer?.destroy()
    this.webglRenderer = null
    this.setEngine('failed')
    this.onFailure(failure)
    console.error(`[BgRenderer] WebGPU failed at ${stage}: ${error.message}`, error)
  }

  private cancelVgpuActivation(): void {
    this.activationToken += 1
    this.loadingVgpu = false
  }

  private isActivationCurrent(token: number): boolean {
    return !this.disposed && token === this.activationToken
  }

  private setEngine(engine: TBgRendererEngine): void {
    if (this.engine === engine) return

    this.engine = engine
    this.onEngineChange(engine)
  }
}

/** Creates the dual-canvas boundary with an explicit WebGL legacy lane and fail-fast vgpu takeover. */
export const createBgRendererAdapter = (
  webglCanvas: HTMLCanvasElement,
  vgpuCanvas: HTMLCanvasElement,
  renderSpec: TBgRenderSpec,
  textureScale: number,
  preferVgpu: boolean,
  onEngineChange: (engine: TBgRendererEngine) => void,
  onFailure: (failure: TBgRendererFailure) => void = () => undefined,
  patternSize = 'auto',
  renderSize?: readonly [number, number],
): TBgRendererAdapter =>
  new BgRendererAdapter(
    webglCanvas,
    vgpuCanvas,
    renderSpec,
    textureScale,
    preferVgpu,
    onEngineChange,
    onFailure,
    patternSize,
    renderSize,
  )
