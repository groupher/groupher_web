import './style.css'
import type { TVgpuPocController, TVgpuPocMeshSpec, TVgpuPocModel } from './types'

const RUNNER_LOAD_TIMEOUT_MS = 10_000

type TVgpuPocFailureStage = 'capability' | 'runtime-load' | 'gpu-run'
type TVgpuPocFailureCode =
  | 'WEBGPU_UNAVAILABLE'
  | 'VGPU_RUNNER_LOAD_TIMEOUT'
  | 'VGPU_RUNNER_LOAD_FAILED'
  | 'VGPU_POC_RUN_FAILED'
type TVgpuPocFailureReport = {
  error: string
  stage: TVgpuPocFailureStage
  code: TVgpuPocFailureCode
  elapsedMs?: number
  timeoutMs?: number
}
type TVgpuPocSuccessReport = TVgpuPocController['report'] & {
  runtimeLoadMs: number
  runtimeLoadTimeoutMs: number
}
type TRunnerModule = typeof import('./runner')

class RunnerLoadError extends Error {
  readonly code: Extract<
    TVgpuPocFailureCode,
    'VGPU_RUNNER_LOAD_TIMEOUT' | 'VGPU_RUNNER_LOAD_FAILED'
  >
  readonly elapsedMs: number

  constructor(code: RunnerLoadError['code'], message: string, elapsedMs: number) {
    super(message)
    this.name = 'RunnerLoadError'
    this.code = code
    this.elapsedMs = elapsedMs
  }
}

declare global {
  interface Window {
    __VGPU_WALLPAPER_POC__?: TVgpuPocSuccessReport | TVgpuPocFailureReport
  }
}

const specs: readonly [TVgpuPocMeshSpec, TVgpuPocMeshSpec] = [
  {
    model: 'flow',
    colors: ['#2d1b69', '#6c3ce1', '#f45ba5', '#ff9d52', '#f8ddb3', '#8bd5ff'],
    colorStops: [0, 18, 42, 63, 82, 100],
    flow: 32,
    softness: 64,
    seed: 41,
    warp: 58,
    scale: 56,
    brightness: 105,
    contrast: 108,
  },
  {
    model: 'liquid',
    colors: ['#fff3de', '#ffd1dc', '#ff9e56', '#73c7f3', '#9b7bea', '#552d91'],
    colorStops: [0, 20, 43, 65, 82, 100],
    flow: 148,
    softness: 74,
    seed: 23,
    warp: 62,
    scale: 58,
    brightness: 102,
    contrast: 104,
  },
]

const getCanvas = (model: TVgpuPocModel): HTMLCanvasElement => {
  const canvas = document.querySelector<HTMLCanvasElement>(`canvas[data-model="${model}"]`)
  if (!canvas) throw new Error(`Missing ${model} canvas`)
  return canvas
}

const setStatus = (text: string, state: 'working' | 'pass' | 'fail'): void => {
  const status = document.querySelector<HTMLElement>('[data-status]')
  if (!status) return
  status.textContent = text
  status.dataset.state = state
}

const setReport = (report: TVgpuPocSuccessReport | TVgpuPocFailureReport): void => {
  const reportElement = document.querySelector<HTMLElement>('[data-report]')
  if (reportElement) reportElement.textContent = JSON.stringify(report, null, 2)
}

const publishFailure = (failure: TVgpuPocFailureReport): void => {
  window.__VGPU_WALLPAPER_POC__ = failure
  setStatus(`[${failure.stage}/${failure.code}] ${failure.error}`, 'fail')
  setReport(failure)
}

const loadRunnerWithTimeout = async (): Promise<{
  runner: TRunnerModule
  runtimeLoadMs: number
}> => {
  const startedAt = performance.now()
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const importPromise = import('./runner')
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      const elapsedMs = performance.now() - startedAt
      reject(
        new RunnerLoadError(
          'VGPU_RUNNER_LOAD_TIMEOUT',
          `Runner chunk load exceeded ${RUNNER_LOAD_TIMEOUT_MS}ms`,
          elapsedMs,
        ),
      )
    }, RUNNER_LOAD_TIMEOUT_MS)
  })

  try {
    const runner = await Promise.race([importPromise, timeoutPromise])
    return { runner, runtimeLoadMs: performance.now() - startedAt }
  } catch (error) {
    if (error instanceof RunnerLoadError) throw error

    const message = error instanceof Error ? error.message : String(error)
    throw new RunnerLoadError(
      'VGPU_RUNNER_LOAD_FAILED',
      `Runner chunk failed to load: ${message}`,
      performance.now() - startedAt,
    )
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId)
    // import() cannot be aborted. runner.ts has no top-level GPU work, so a late chunk stays inert.
  }
}

const addDownloadLinks = (controller: TVgpuPocController): void => {
  for (const model of ['flow', 'liquid'] as const) {
    const link = document.querySelector<HTMLAnchorElement>(`a[data-download="${model}"]`)
    if (!link) continue
    link.href = URL.createObjectURL(controller.exports[model])
    link.download = `wallpaper-${model}.webp`
    link.hidden = false
  }
}

const start = async (): Promise<void> => {
  if (!navigator.gpu) {
    publishFailure({
      error: '当前浏览器未提供 WebGPU',
      stage: 'capability',
      code: 'WEBGPU_UNAVAILABLE',
    })
    return
  }

  let stage: TVgpuPocFailureStage = 'runtime-load'
  try {
    // The POC runtime stays in an async chunk; production pages do not import it.
    const { runner, runtimeLoadMs } = await loadRunnerWithTimeout()
    stage = 'gpu-run'
    const { runVgpuWallpaperPoc } = runner
    const controller = await runVgpuWallpaperPoc(
      { flow: getCanvas('flow'), liquid: getCanvas('liquid') },
      specs,
    )
    const report: TVgpuPocSuccessReport = {
      ...controller.report,
      runtimeLoadMs,
      runtimeLoadTimeoutMs: RUNNER_LOAD_TIMEOUT_MS,
    }
    window.__VGPU_WALLPAPER_POC__ = report
    addDownloadLinks(controller)

    const passed =
      controller.report.topOriginReadback &&
      controller.report.asyncErrors.length === 0 &&
      controller.report.renders.every(
        (render) =>
          render.canvasBackingSizeMatches &&
          render.readbackIsContiguousRgba &&
          render.webpMime === 'image/webp' &&
          render.webpDimensionsMatch &&
          render.webpUnder800Kb,
      )
    setStatus(passed ? 'POC 验收项通过' : 'POC 存在未通过项', passed ? 'pass' : 'fail')
    setReport(report)
    window.addEventListener('beforeunload', controller.dispose, { once: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const runnerLoadError = error instanceof RunnerLoadError ? error : undefined
    publishFailure({
      error: message,
      stage,
      code: runnerLoadError?.code ?? 'VGPU_POC_RUN_FAILED',
      elapsedMs: runnerLoadError?.elapsedMs,
      timeoutMs: runnerLoadError ? RUNNER_LOAD_TIMEOUT_MS : undefined,
    })
  }
}

void start()
