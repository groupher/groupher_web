import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clone, pick } from 'ramda'
import { createContext, use, useMemo, useState } from 'react'

import { ASSETS_HUB_READ_ENDPOINT } from '~/config'
import { GRADIENT_PALETTE, GRADIENT_WALLPAPER, WALLPAPER_TYPE } from '~/const/wallpaper'
import { browserGraphQLRequest } from '~/graphql/client'
import useFullWallpaper from '~/hooks/useFullWallpaper'
import useTheme from '~/hooks/useTheme'
import useTrans from '~/hooks/useTrans'
import { adaptWallpaperBgRenderSpec } from '~/hooks/useWallpaper'
import { normalizePersistedAngle, normalizeSignedAngle } from '~/lib/angle'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import {
  applyGradientPalette,
  composeGradientRecipeForRenderer,
  DEFAULT_WALLPAPER_TEXTURE_INTENSITY,
  GRADIENT_RENDERER,
  isMeshGradientRecipe,
} from '~/lib/wallpaperMesh'
import type { TGradientRecipe, TGradientRenderer } from '~/lib/wallpaperMesh'
import { wallpaperKeys } from '~/query'
import { exportWallpaperAsset } from '~/render/WallpaperExport'
import type { TParsedWallpaper, TStaticWallpaper, TWallpaperData, TWallpaperType } from '~/spec'
import useCommunity from '~/stores/community/hooks'
import { WALLPAPER_STATE_KEYS } from '~/stores/wallpaper/constant'
import {
  getWallpaperSavablePatch,
  pickWallpaperThemeState,
  toWallpaperThemePatch,
} from '~/stores/wallpaper/helper'
import useWallpaperDomain, { useWallpaperStore } from '~/stores/wallpaper/hooks'
import type { TWallpaperPatch, TWallpaperThemeState } from '~/stores/wallpaper/spec'
import { toast } from '~/ui/Toaster'
import { extractErrorMessage } from '~/unit/DsbThread/AssetsHub/helper'
import { uploadCommunityAsset } from '~/unit/DsbThread/AssetsHub/uploadCommunityAsset'

import { TAB } from './constant'
import S from './schema'
import type { TTab } from './spec'
import useWallpaperPreview, { type TWallpaperPreviewPatch } from './useWallpaperPreview'

const getInitialTab = (type: TWallpaperType): TTab => {
  switch (type) {
    case WALLPAPER_TYPE.PATTERN: {
      return TAB.PICTURES
    }
    case WALLPAPER_TYPE.UPLOAD: {
      return TAB.UPLOAD
    }
    default: {
      return TAB.GRADIENT
    }
  }
}

type TWallpaperSaveRequest = {
  community: string
  wallpaper: TWallpaperPatch
  submitted: TWallpaperPatch
}

type TWallpaperPublication = {
  staticPatch: TWallpaperPatch
  staticRevision: string
}

export type TWallpaperLogic = {
  tab: TTab
  loading: boolean
  // derived
  getWallpaper: () => TWallpaperData
  isTouched: boolean
  // actions
  initRollback: () => void
  rollbackWallpaper: () => void
  onSave: () => void

  changeTab: (tab: TTab) => void
  changeAngle: (angle: number) => void
  removeWallpaper: () => void
  changeGradientWallpaper: (source: string) => void
  changeGradientRecipe: (gradient: TGradientRecipe) => void
  changeGradientRenderer: (renderer: TGradientRenderer) => void
  changePatternId: (patternId: string) => void
  changePatternTone: (patternTone: TWallpaperThemeState['pattern']['tone']) => void
  changePatternWallpaper: (source: string) => void
  changeWallpaperType: (type: TWallpaperType) => void
  togglePattern: (enabled: boolean) => void
  toggleTexture: (enabled: boolean) => void
  changeBlurIntensity: (blurIntensity: number) => void
  changePatternIntensity: (patternIntensity: number) => void
  toggleShadow: (enabled: boolean) => void
  changeBrightness: (brightness: number) => void
  changeSaturation: (saturation: number) => void
  changeTexture: (texture: TWallpaperThemeState['texture']) => void
  previewWallpaper: (patch: TWallpaperPreviewPatch) => void
  scheduleWallpaperPreview: (patch: TWallpaperPreviewPatch) => void
  flushWallpaperDraft: () => void
  clearPendingWallpaperDraft: () => void
  clearWallpaperPreview: () => void
}

export const LogicContext = createContext<TWallpaperLogic | null>(null)
LogicContext.displayName = 'WallpaperLogic'

const RADIAL_DEFAULT_CENTER_DISTANCE = 0.22

const radialCenterFromAngle = (
  angle: number,
  center: { x: number; y: number },
): { x: number; y: number } => {
  // Radial gradients reuse angle as focal-point direction. Keep the
  // existing center distance so the preset shape stays intact while rotating.
  const currentDistance = Math.hypot(center.x - 0.5, center.y - 0.5)
  const distance = currentDistance > 0.001 ? currentDistance : RADIAL_DEFAULT_CENTER_DISTANCE
  const rad = (normalizeSignedAngle(angle) * Math.PI) / 180

  return {
    x: 0.5 + Math.sin(rad) * distance,
    y: 0.5 - Math.cos(rad) * distance,
  }
}

/**
 * Compose the patch for switching the active wallpaper gradient preset.
 *
 * In gradient mode it preserves the current renderer/shape and only applies the
 * new palette. From non-gradient modes it starts from the catalog recipe.
 *
 * @example
 * const patch = composeGradientWallpaperPatch(wallpaperState, 'stone_green')
 */
export const composeGradientWallpaperPatch = (
  wallpaper: Pick<TWallpaperThemeState, 'type' | 'gradient'>,
  source: string,
): Pick<TWallpaperThemeState, 'source' | 'type' | 'gradient'> => {
  const palette = GRADIENT_PALETTE[source] ?? GRADIENT_PALETTE.amber_mauve
  const initialGradient = GRADIENT_WALLPAPER[source] ?? GRADIENT_WALLPAPER.amber_mauve
  const gradient =
    wallpaper.type === WALLPAPER_TYPE.GRADIENT && wallpaper.gradient
      ? applyGradientPalette(wallpaper.gradient, palette)
      : composeGradientRecipeForRenderer(initialGradient, GRADIENT_RENDERER.LINEAR)

  return {
    source,
    type: WALLPAPER_TYPE.GRADIENT,
    gradient,
  }
}

export const serializeWallpaperPatch = (
  patch: TWallpaperPatch & { staticRevision?: string },
): Record<string, unknown> => {
  const serialized = clone(patch) as Record<string, unknown>

  for (const theme of ['light', 'dark']) {
    const themePatch = serialized[theme] as Record<string, unknown> | undefined
    if (!themePatch) continue

    for (const key of ['gradient', 'pattern', 'contentShadow', 'effect', 'texture']) {
      if (key in themePatch && themePatch[key] !== null && themePatch[key] !== undefined) {
        const value = themePatch[key]
        const serializableValue =
          key === 'gradient' && value && typeof value === 'object' && !Array.isArray(value)
            ? {
                ...(value as Record<string, unknown>),
                ...(typeof (value as Record<string, unknown>).angle === 'number'
                  ? {
                      angle: normalizePersistedAngle(
                        (value as Record<string, unknown>).angle as number,
                      ),
                    }
                  : {}),
              }
            : value

        themePatch[key] = JSON.stringify(serializableValue)
      }
    }
  }

  return serialized
}

const createStaticRevision = (): string =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}`

const hasUploadRasterEffects = (state: TWallpaperThemeState): boolean =>
  state.texture.enabled ||
  state.effect.blurIntensity !== 0 ||
  state.effect.brightness !== 100 ||
  state.effect.saturation !== 100

export const requiresWallpaperExport = (state: TWallpaperThemeState): boolean =>
  state.type !== WALLPAPER_TYPE.UPLOAD || hasUploadRasterEffects(state)

const toStaticAsset = (assetPublicRef: string | null): TStaticWallpaper['light'] =>
  assetPublicRef
    ? {
        assetPublicRef,
        url: `${ASSETS_HUB_READ_ENDPOINT}/a/${assetPublicRef}/original`,
      }
    : null

/** Builds and publishes static light/dark artifacts before the recipe mutation commits. */
const publishWallpaperAssets = async (
  community: string,
  wallpaper$: ReturnType<typeof useWallpaperStore>,
  submitted: TWallpaperPatch,
): Promise<TWallpaperPublication> => {
  const staticPatch: TWallpaperPatch = {}

  for (const theme of ['light', 'dark'] as const) {
    const state = wallpaper$[theme]
    const branchSubmitted = submitted[theme] !== undefined
    let staticAssetPublicRef: string | null = null

    if (state.type === WALLPAPER_TYPE.NONE) {
      staticAssetPublicRef = null
    } else if (!branchSubmitted && state.staticAssetPublicRef) {
      staticAssetPublicRef = state.staticAssetPublicRef
    } else if (!requiresWallpaperExport(state)) {
      staticAssetPublicRef = state.assetPublicRef ?? null
      if (!staticAssetPublicRef) {
        throw new Error(`UPLOAD wallpaper ${theme} is missing assetPublicRef`)
      }
    } else {
      if (typeof navigator === 'undefined' || !navigator.gpu) {
        throw new Error('WebGPU is required to publish this Wallpaper')
      }

      const exported = await exportWallpaperAsset(adaptWallpaperBgRenderSpec(state), {
        filename: `wallpaper-${theme}-vgpu.webp`,
        patternSize: DEFAULT_WALLPAPER_PATTERN_SIZE,
      })
      const uploaded = await uploadCommunityAsset({ community, file: exported.file })
      staticAssetPublicRef = uploaded.assetPublicRef
    }

    staticPatch[theme] = { staticAssetPublicRef }
  }

  return {
    staticPatch,
    staticRevision: createStaticRevision(),
  }
}

/** Exposes logic value state and actions through the shared React hook boundary. */
export function useLogicValue(): TWallpaperLogic {
  const wallpaper$ = useWallpaperDomain()
  const liveWallpaper$ = useWallpaperStore()
  const community$ = useCommunity()
  const { getWallpaper } = useFullWallpaper()
  const { isDarkTheme } = useTheme()
  const { t } = useTrans()
  const queryClient = useQueryClient()

  const [tab, setTab] = useState<TTab>(() =>
    getInitialTab(pickWallpaperThemeState(wallpaper$, isDarkTheme).type),
  )
  const wallpaperState = useMemo(
    () => pickWallpaperThemeState(wallpaper$, isDarkTheme),
    [isDarkTheme, wallpaper$.light, wallpaper$.dark],
  )
  const {
    previewWallpaper,
    scheduleWallpaperPreview,
    flushWallpaperDraft: flushWallpaperDraftPreview,
    clearPendingWallpaperDraft,
    clearWallpaperPreview: clearWallpaperPreviewBase,
  } = useWallpaperPreview({
    state: wallpaperState,
    onCommit: (patch) => liveWallpaper$.commit(toWallpaperThemePatch(patch, isDarkTheme)),
  })
  const isTouched = useMemo((): boolean => {
    return Object.keys(getWallpaperSavablePatch(wallpaper$)).length > 0
  }, [wallpaper$])

  const initRollback = (): void =>
    liveWallpaper$.commit({ original: clone(pick(WALLPAPER_STATE_KEYS, liveWallpaper$)) })

  const wallpaperMutation = useMutation({
    mutationKey: ['dsb', 'wallpaper', community$.slug],
    mutationFn: async ({ community, submitted }: TWallpaperSaveRequest) => {
      const publication = await publishWallpaperAssets(community, liveWallpaper$, submitted)
      const wallpaper = {
        staticRevision: publication.staticRevision,
        light:
          submitted.light || publication.staticPatch.light
            ? { ...submitted.light, ...publication.staticPatch.light }
            : undefined,
        dark:
          submitted.dark || publication.staticPatch.dark
            ? { ...submitted.dark, ...publication.staticPatch.dark }
            : undefined,
      }

      await browserGraphQLRequest(S.updateDashboardWallpaper, {
        community,
        wallpaper: serializeWallpaperPatch(wallpaper),
      })

      return { publication, wallpaper }
    },
    onSuccess: ({ publication, wallpaper }, { community }) => {
      const confirmed = clone(liveWallpaper$.original)
      for (const theme of ['light', 'dark'] as const) {
        const patch = wallpaper[theme]
        if (!patch) continue
        confirmed[theme] = { ...confirmed[theme], ...patch }
      }
      liveWallpaper$.commit(publication.staticPatch)
      liveWallpaper$.acceptSubmitted(wallpaper)
      const confirmedWallpaper = {
        ...confirmed,
        staticRevision: publication.staticRevision,
      }
      queryClient.setQueryData<TParsedWallpaper>(wallpaperKeys.config(community), (previous) => ({
        ...previous,
        ...confirmedWallpaper,
        initWallpaper: clone(confirmedWallpaper),
        staticWallpaper: {
          light: toStaticAsset(publication.staticPatch.light?.staticAssetPublicRef ?? null),
          dark: toStaticAsset(publication.staticPatch.dark?.staticAssetPublicRef ?? null),
          revision: publication.staticRevision,
        },
      }))
      toast(t('dsb.appearance.saved'), 'success')
    },
    onError: (err) => {
      console.error('## wallpaper publish error: ', err)
      toast(extractErrorMessage(err), 'error')
    },
  })

  const commitWallpaperPatch = (patch: Partial<TWallpaperThemeState>): void => {
    flushWallpaperDraft()
    clearWallpaperPreview()
    liveWallpaper$.commit(toWallpaperThemePatch(patch, isDarkTheme))
  }

  const rollbackWallpaper = (): void => {
    clearPendingWallpaperDraft()
    clearWallpaperPreview()
    liveWallpaper$.commit({ ...liveWallpaper$.original })
  }

  const onSave = (): void => {
    flushWallpaperDraft()
    clearWallpaperPreview()
    const community = community$.slug
    const submitted = clone(getWallpaperSavablePatch(liveWallpaper$))
    const params = {
      community,
      submitted,
      wallpaper: submitted,
    }
    wallpaperMutation.mutate(params)
  }

  const changeTab = (tab: TTab): void => setTab(tab)
  const applyAngleChange = (nextAngle: number): void => {
    if (wallpaperState.gradient?.renderer === GRADIENT_RENDERER.LINEAR) {
      scheduleWallpaperPreview({ gradient: { angle: nextAngle } })
      return
    }

    if (wallpaperState.gradient && isMeshGradientRecipe(wallpaperState.gradient)) {
      scheduleWallpaperPreview({ gradient: { angle: nextAngle } })
      return
    }

    if (wallpaperState.gradient?.renderer === GRADIENT_RENDERER.RADIAL) {
      scheduleWallpaperPreview({
        gradient: {
          ...wallpaperState.gradient,
          center: radialCenterFromAngle(nextAngle, wallpaperState.gradient.center),
        },
      })
      return
    }

    if (wallpaperState.gradient) return

    const fallback = GRADIENT_WALLPAPER.amber_mauve
    scheduleWallpaperPreview({ gradient: { ...fallback, angle: nextAngle } })
  }
  const clearWallpaperPreview = (): void => clearWallpaperPreviewBase()
  const changeAngle = (angle: number): void => applyAngleChange(normalizeSignedAngle(angle))
  const flushWallpaperDraft = (): void => flushWallpaperDraftPreview()
  const removeWallpaper = (): void => {
    clearPendingWallpaperDraft()
    clearWallpaperPreview()
    liveWallpaper$.commit(
      toWallpaperThemePatch({ source: '', type: WALLPAPER_TYPE.NONE }, isDarkTheme),
    )
  }
  const changeGradientWallpaper = (source: string): void =>
    commitWallpaperPatch(composeGradientWallpaperPatch(wallpaperState, source))
  const changeGradientRecipe = (gradient: TGradientRecipe): void =>
    commitWallpaperPatch({ source: gradient.preset, type: WALLPAPER_TYPE.GRADIENT, gradient })
  const changeGradientRenderer = (renderer: TGradientRenderer): void => {
    const gradient = wallpaperState.gradient ?? GRADIENT_WALLPAPER.amber_mauve

    commitWallpaperPatch({
      source: gradient.preset,
      type: WALLPAPER_TYPE.GRADIENT,
      gradient: composeGradientRecipeForRenderer(gradient, renderer),
    })
  }
  const changePatternId = (patternId: string): void =>
    commitWallpaperPatch({ pattern: { ...wallpaperState.pattern, id: patternId, enabled: true } })
  const changePatternTone = (patternTone: TWallpaperThemeState['pattern']['tone']): void =>
    commitWallpaperPatch({ pattern: { ...wallpaperState.pattern, tone: patternTone } })
  const changePatternWallpaper = (source: string): void =>
    commitWallpaperPatch({ source, type: WALLPAPER_TYPE.PATTERN })

  const changeWallpaperType = (type: TWallpaperType): void => {
    commitWallpaperPatch({ type })
  }

  const togglePattern = (enabled: boolean): void =>
    commitWallpaperPatch({ pattern: { ...wallpaperState.pattern, enabled } })
  const toggleTexture = (enabled: boolean): void => {
    const texture =
      enabled && wallpaperState.texture.intensity === 0
        ? { ...wallpaperState.texture, intensity: DEFAULT_WALLPAPER_TEXTURE_INTENSITY }
        : wallpaperState.texture

    commitWallpaperPatch({ texture: { ...texture, enabled } })
  }
  const changeBlurIntensity = (blurIntensity: number): void =>
    scheduleWallpaperPreview({ effect: { blurIntensity } })
  const changePatternIntensity = (patternIntensity: number): void =>
    scheduleWallpaperPreview({
      pattern: { intensity: patternIntensity },
    })
  const toggleShadow = (enabled: boolean): void =>
    commitWallpaperPatch({ contentShadow: { enabled } })
  const changeBrightness = (brightness: number): void =>
    scheduleWallpaperPreview({ effect: { brightness } })
  const changeSaturation = (saturation: number): void =>
    scheduleWallpaperPreview({ effect: { saturation } })
  const changeTexture = (texture: TWallpaperThemeState['texture']): void =>
    scheduleWallpaperPreview({ texture })

  return {
    tab,
    loading: wallpaperMutation.isPending,
    // drive
    getWallpaper,
    isTouched,
    //actions
    initRollback,
    rollbackWallpaper,
    onSave,
    changeTab,
    changeAngle,
    removeWallpaper,
    changeGradientWallpaper,
    changeGradientRecipe,
    changeGradientRenderer,
    changePatternId,
    changePatternTone,
    changePatternWallpaper,
    changeWallpaperType,
    togglePattern,
    toggleTexture,
    changeBlurIntensity,
    changePatternIntensity,
    toggleShadow,
    changeBrightness,
    changeSaturation,
    changeTexture,
    previewWallpaper,
    scheduleWallpaperPreview,
    flushWallpaperDraft,
    clearPendingWallpaperDraft,
    clearWallpaperPreview,
  }
}

/** Exposes logic state and actions through the shared React hook boundary. */
export default function useLogic(): TWallpaperLogic {
  const value = use(LogicContext)
  if (!value) throw new Error('useLogic must be used within LogicProvider')

  return value
}
