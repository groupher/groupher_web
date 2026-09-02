import { useCallback, useEffect, useRef } from 'react'

import useDebouncedPreviewCommit from '~/hooks/useDebouncedPreviewCommit'
import { adaptWallpaperBgRenderSpec } from '~/hooks/useWallpaper'
import { emitWallpaperPreview } from '~/lib/wallpaperPreview'
import type { TWallpaperThemeState } from '~/stores/wallpaper/spec'

/**
 * A preview-safe patch type for wallpaper state.
 *
 * Top-level fields ({@link type}, {@link source}) are replaced wholesale while
 * nested sub-objects ({@link gradient}, {@link contentShadow}, {@link effect},
 * {@link pattern}, {@link texture}) accept partial updates so callers never need to pass the
 * full sub-object to change one field.
 */
export type TWallpaperPreviewPatch = Partial<
  Omit<TWallpaperThemeState, 'gradient' | 'contentShadow' | 'effect' | 'pattern' | 'texture'>
> & {
  gradient?: Partial<NonNullable<TWallpaperThemeState['gradient']>> | null
  contentShadow?: Partial<TWallpaperThemeState['contentShadow']>
  effect?: Partial<TWallpaperThemeState['effect']>
  pattern?: Partial<TWallpaperThemeState['pattern']>
  texture?: Partial<TWallpaperThemeState['texture']>
}

type TOptions = {
  state: TWallpaperThemeState
  onCommit: (patch: Partial<TWallpaperThemeState>) => void
}

/**
 * Merge a wallpaper preview patch into existing state with deep merge for
 * nested sub-objects.
 *
 * Problem scenario: wallpaper config has four nested sub-objects — `contentShadow`,
 * `effect`, `pattern`, and `texture`. A plain spread would overwrite an entire
 * nested object even when the caller only intends to change one field inside it
 * (e.g., only `pattern.intensity`). Deep-merging preserves unmentioned
 * sub-fields while still shallow-merging top-level fields like `type` and
 * `source`.
 *
 * @example
 * mergeNestedWallpaperPatch(
 *   { type: 'gradient', pattern: { enabled: true, intensity: 50 } },
 *   { pattern: { intensity: 80 } },
 * )
 * // => { type: 'gradient', pattern: { enabled: true, intensity: 80 } }
 */
const mergeNestedWallpaperPatch = <TState extends Partial<TWallpaperPreviewPatch>>(
  state: TState,
  patch: Partial<TWallpaperPreviewPatch>,
): TState & Partial<TWallpaperPreviewPatch> => ({
  ...state,
  ...patch,
  gradient:
    patch.gradient === null
      ? null
      : patch.gradient
        ? { ...state.gradient, ...patch.gradient }
        : state.gradient,
  contentShadow: patch.contentShadow
    ? { ...state.contentShadow, ...patch.contentShadow }
    : state.contentShadow,
  effect: patch.effect ? { ...state.effect, ...patch.effect } : state.effect,
  pattern: patch.pattern ? { ...state.pattern, ...patch.pattern } : state.pattern,
  texture: patch.texture ? { ...state.texture, ...patch.texture } : state.texture,
})

/**
 * Apply a preview patch on top of the current committed state for commit
 * purposes.
 *
 * Problem scenario: the debounced commit fires **after** the user may have
 * already made more preview changes. If we applied the accumulated patch on top
 * of the live draft (which already contains subsequent preview edits), we would
 * double-apply those later edits. Committing against the most recent committed
 * state ensures each persisted patch is exactly what the user saw at the time
 * they paused.
 *
 * @example
 * // Inside the debounced onCommit callback:
 * const finalState = mergeWallpaperPreviewPatch(stateRef.current, accumulatedPatch)
 * store.commit(finalState)
 */
const mergeWallpaperPreviewPatch = (
  state: TWallpaperThemeState,
  patch: TWallpaperPreviewPatch,
): TWallpaperThemeState => mergeNestedWallpaperPatch(state, patch) as TWallpaperThemeState

/**
 * Accumulate incremental patches into the pending debounced draft.
 *
 * Problem scenario: the user may drag a slider across several ticks within the
 * debounce window (300 ms). Each tick produces a patch — e.g.
 * `{ effect: { blurIntensity: 30 } }` followed by `{ effect: { blurIntensity: 35 } }`.
 * Without merging, the first patch would be lost. This accumulator deep-merges
 * each new patch into the pending batch so the final commit carries the latest
 * value of every field that was touched.
 *
 * @example
 * // First tick  → pending: { effect: { blurIntensity: 30 } }
 * // Second tick → pending: { effect: { blurIntensity: 35 } }
 * // Commit fires → { effect: { blurIntensity: 35 } }
 */
const mergeWallpaperDraftPatch = (
  currentPatch: Partial<TWallpaperPreviewPatch>,
  patch: Partial<TWallpaperPreviewPatch>,
): Partial<TWallpaperPreviewPatch> => {
  // The debounce hook already normalizes the pending patch container to `{}`.
  // Keep this merge focused on wallpaper semantics so valid field nulls like
  // `gradient: null` and `customWallpaper: null` keep their meaning.
  return mergeNestedWallpaperPatch(currentPatch, patch)
}

/**
 * Orchestrate live wallpaper preview with dual-path updates.
 *
 * Problem scenario: the wallpaper editor has controls (gradient picker, pattern
 * toggle, effect sliders) that must feel real-time during interaction but
 * should only trigger saveable store writes after the user pauses. Writing to
 * the store on every control event would cause excessive re-renders; writing
 * only on commit would feel laggy.
 *
 * This hook implements two parallel paths:
 *
 * 1. **Preview path** (instant, every frame)
 *    - Adapts the draft once into a renderer-ready spec.
 *    - Publishes one latest-wins preview frame to every registered target.
 *
 * 2. **Commit path** (debounced, 300 ms)
 *    - Accumulates incremental patches via `useDebouncedPreviewCommit`.
 *    - Fires `onCommit` with the merged patch when the user pauses.
 *
 * @param state - The latest committed wallpaper state for this theme branch.
 *   The hook keeps an internal ref so commits always merge against the correct
 *   baseline.
 * @param onCommit - Callback invoked with the merged patch when a debounced
 *   commit fires. Typically writes to the wallpaper store's touched fields.
 *
 * @returns An object with these methods:
 *
 * | Method | Purpose |
 * |---|---|
 * | `previewWallpaper(patch)` | Apply visual preview **without** scheduling a commit. Use for hover or drag interactions where only the final value should persist. |
 * | `scheduleWallpaperPreview(patch)` | Apply visual preview **and** schedule a debounced commit. Use for slider changes that should auto-save. |
 * | `flushWallpaperDraft()` | Immediately flush any pending debounced commit. Call before navigating away or triggering an explicit save. |
 * | `clearPendingWallpaperDraft()` | Cancel any pending debounced commit without flushing. Use when rolling back unsaved changes. |
 * | `clearWallpaperPreview()` | Emit a null preview frame so targets return to their committed spec. |
 *
 * @example
 * const {
 *   previewWallpaper,
 *   scheduleWallpaperPreview,
 *   flushWallpaperDraft,
 *   clearWallpaperPreview,
 * } = useWallpaperPreview({
 *   state: pickWallpaperThemeState(wallpaperStore, isDarkTheme),
 *   onCommit: (patch) => wallpaperStore.commit(
 *     isDarkTheme ? { dark: patch } : { light: patch },
 *   ),
 * })
 *
 * // Drag a blur slider — preview every tick, commit on release
 * const onBlurChange = useCallback((value: number) => {
 *   previewWallpaper({ effect: { blurIntensity: value } })
 * }, [previewWallpaper])
 *
 * const onBlurCommit = useCallback(() => {
 *   flushWallpaperDraft()
 * }, [flushWallpaperDraft])
 */
export default function useWallpaperPreview({ state, onCommit }: TOptions) {
  const draftRef = useRef(state)
  const stateRef = useRef(state)
  const previewFrameRef = useRef<number | null>(null)
  const pendingPreviewRef = useRef<TWallpaperThemeState | null>(null)
  const {
    schedule: scheduleWallpaperDraft,
    flush: flushWallpaperDraft,
    clear: clearPendingWallpaperDraft,
  } = useDebouncedPreviewCommit<TWallpaperPreviewPatch>({
    mergePatch: mergeWallpaperDraftPatch,
    onCommit: (patch) => onCommit(mergeWallpaperPreviewPatch(stateRef.current, patch)),
  })

  useEffect(() => {
    stateRef.current = state
    draftRef.current = state
  }, [state])

  const flushPreview = useCallback(() => {
    previewFrameRef.current = null

    const nextState = pendingPreviewRef.current
    pendingPreviewRef.current = null
    if (!nextState) return

    emitWallpaperPreview(adaptWallpaperBgRenderSpec(nextState))
  }, [])

  const queuePreview = useCallback(
    (nextState: TWallpaperThemeState) => {
      pendingPreviewRef.current = nextState

      if (previewFrameRef.current !== null) return
      previewFrameRef.current = window.requestAnimationFrame(flushPreview)
    },
    [flushPreview],
  )

  const previewWallpaper = useCallback(
    (patch: TWallpaperPreviewPatch) => {
      const nextState = mergeWallpaperPreviewPatch(draftRef.current, patch)
      draftRef.current = nextState
      queuePreview(nextState)
    },
    [queuePreview],
  )

  const scheduleWallpaperPreview = useCallback(
    (patch: TWallpaperPreviewPatch) => {
      previewWallpaper(patch)
      scheduleWallpaperDraft(patch)
    },
    [previewWallpaper, scheduleWallpaperDraft],
  )

  const flushWallpaperPreview = useCallback(() => {
    if (previewFrameRef.current !== null) {
      window.cancelAnimationFrame(previewFrameRef.current)
      previewFrameRef.current = null
    }

    flushPreview()
  }, [flushPreview])

  const clearWallpaperPreview = useCallback(() => {
    if (previewFrameRef.current !== null) {
      window.cancelAnimationFrame(previewFrameRef.current)
      previewFrameRef.current = null
    }
    pendingPreviewRef.current = null
    emitWallpaperPreview(null)
  }, [])

  const flushWallpaperDraftPreview = useCallback(() => {
    flushWallpaperPreview()
    flushWallpaperDraft()
  }, [flushWallpaperDraft, flushWallpaperPreview])

  useEffect(() => {
    return () => {
      if (previewFrameRef.current !== null) {
        window.cancelAnimationFrame(previewFrameRef.current)
      }
    }
  }, [])

  return {
    previewWallpaper,
    scheduleWallpaperPreview,
    flushWallpaperDraft: flushWallpaperDraftPreview,
    clearPendingWallpaperDraft,
    clearWallpaperPreview,
  }
}
