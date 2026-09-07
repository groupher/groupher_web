import type { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clone } from 'ramda'
import { createContext, use, useMemo, useRef, useState } from 'react'

import { ASSETS_HUB_READ_ENDPOINT } from '~/config'
import { GRADIENT_PALETTE, GRADIENT_WALLPAPER, WALLPAPER_TYPE } from '~/const/wallpaper'
import { browserGraphQLRequest } from '~/graphql/client'
import useFullWallpaper from '~/hooks/useFullWallpaper'
import useTheme from '~/hooks/useTheme'
import useTrans from '~/hooks/useTrans'
import { adaptWallpaperBgRenderSpec } from '~/hooks/useWallpaper'
import { normalizeSignedAngle } from '~/lib/angle'
import type { WallpaperProfile, WallpaperTheme } from '~/lib/graphql/generated/graphql'
import {
  applyGradientPalette,
  composeGradientRecipeForRenderer,
  DEFAULT_WALLPAPER_TEXTURE_INTENSITY,
  GRADIENT_RENDERER,
  isMeshGradientRecipe,
} from '~/lib/wallpaperMesh'
import type { TGradientRecipe, TGradientRenderer } from '~/lib/wallpaperMesh'
import type { TWallpaperProfile } from '~/lib/wallpaperProfiles'
import { encodeWallpaperSettings } from '~/lib/wallpaperSettingsCodec'
import { wallpaperEditorKeys, wallpaperKeys, wallpaperQueries } from '~/query'
import { exportWallpaperBatch, wallpaperExportTargets } from '~/render/WallpaperExport'
import type { TWallpaperData, TWallpaperType } from '~/spec'
import useCommunity from '~/stores/community/hooks'
import useStaticWallpaper from '~/stores/staticWallpaper/hooks'
import {
  getWallpaperThemeSavablePatch,
  pickWallpaperThemeState,
  toWallpaperThemePatch,
} from '~/stores/wallpaper/helper'
import useWallpaperDomain, { useWallpaperStore } from '~/stores/wallpaper/hooks'
import type { TWallpaperPatch, TWallpaperThemeState } from '~/stores/wallpaper/spec'
import { toast } from '~/ui/Toaster'
import { extractErrorMessage } from '~/unit/DsbThread/AssetsHub/helper'
import { uploadGeneratedImage } from '~/unit/DsbThread/AssetsHub/uploadGeneratedImage'

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
  baseVersion: number
  idempotencyKey: string
  submitted: TWallpaperPatch
  theme: 'light' | 'dark'
}

type TGeneratedUploadIntent = {
  capability: string
  profile: string
  uploadRef: string
}

const createIdempotencyKey = (): string =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

const toGraphqlTheme = (theme: 'light' | 'dark'): WallpaperTheme =>
  theme === 'dark' ? 'DARK' : 'LIGHT'

const toGraphqlProfile = (profile: TWallpaperProfile): WallpaperProfile =>
  profile.toUpperCase() as WallpaperProfile

const graphqlErrorCode = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object' || !('errors' in error)) return undefined
  const errors = error.errors
  if (!Array.isArray(errors)) return undefined
  const code = errors.find(
    (item) =>
      item &&
      typeof item === 'object' &&
      'extensions' in item &&
      item.extensions &&
      typeof item.extensions === 'object' &&
      'code' in item.extensions,
  )
  return code && typeof code === 'object' && 'extensions' in code
    ? String((code.extensions as { code?: unknown }).code)
    : undefined
}

export type TWallpaperLogic = {
  tab: TTab
  loading: boolean
  // derived
  getWallpaper: () => TWallpaperData
  isTouched: boolean
  // actions
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

const createAssetsHubBatch = async (capability: string): Promise<void> => {
  const response = await fetch(`${ASSETS_HUB_READ_ENDPOINT}/generated-batches`, {
    body: JSON.stringify({ capability }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GENERATED_IMAGE_BATCH_CREATE_FAILED: ${body || response.status}`)
  }
}

const cancelAssetsHubBatch = async (batchRef: string, capability: string): Promise<void> => {
  await fetch(`${ASSETS_HUB_READ_ENDPOINT}/generated-batches/${batchRef}/cancel`, {
    body: JSON.stringify({ capability }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  }).catch(() => undefined)
}

const publishWallpaperAssets = async (
  community: string,
  wallpaper: TWallpaperThemeState,
  theme: 'light' | 'dark',
  baseVersion: number,
  idempotencyKey: string,
): Promise<ResultOf<typeof S.publishWallpaper>['publishWallpaper']> => {
  const settings = encodeWallpaperSettings(wallpaper)
  const generated = wallpaper.type !== WALLPAPER_TYPE.NONE
  let exported: Awaited<ReturnType<typeof exportWallpaperBatch>> = []

  if (generated) {
    if (typeof navigator === 'undefined' || !navigator.gpu) {
      throw new Error('WebGPU is required to publish this Wallpaper')
    }

    exported = await exportWallpaperBatch({
      targets: wallpaperExportTargets(),
      themes: [
        {
          // Export may await a lazy GPU runtime while the editor remains live.
          // Freeze the complete render input so a later draft edit cannot alter
          // the images that are published with the captured settings.
          renderSpec: adaptWallpaperBgRenderSpec(wallpaper),
          theme,
        },
      ],
    })
  }

  if (!generated) {
    const result = await browserGraphQLRequest<
      ResultOf<typeof S.publishWallpaper>,
      VariablesOf<typeof S.publishWallpaper>
    >(S.publishWallpaper, {
      community,
      input: {
        baseVersion,
        idempotencyKey,
        settings,
        theme: toGraphqlTheme(theme),
        batchRef: null,
      },
    })
    return result.publishWallpaper
  }

  const batchResult = await browserGraphQLRequest<
    ResultOf<typeof S.prepareWallpaperUpload>,
    VariablesOf<typeof S.prepareWallpaperUpload>
  >(S.prepareWallpaperUpload, {
    community,
    input: {
      baseVersion,
      idempotencyKey,
      images: exported.map((variant) => ({
        checksum: variant.checksum,
        height: variant.height,
        mimeType: variant.mimeType,
        profile: toGraphqlProfile(variant.targetKey.replace(`${theme}-`, '') as TWallpaperProfile),
        sizeBytes: variant.blob.size,
        width: variant.width,
      })),
      settings,
      theme: toGraphqlTheme(theme),
    },
  })
  const batch = batchResult.prepareWallpaperUpload
  if (!batch) throw new Error('GENERATED_IMAGE_BATCH_CREATE_FAILED: empty response')

  try {
    await createAssetsHubBatch(batch.batchCapability)
    const intents = batch.uploadIntents as TGeneratedUploadIntent[]
    const intentByProfile = new Map(intents.map((intent) => [intent.profile.toLowerCase(), intent]))

    await Promise.all(
      exported.map((variant) => {
        const profile = variant.targetKey.replace(`${theme}-`, '')
        const intent = intentByProfile.get(profile)
        if (!intent) throw new Error(`GENERATED_IMAGE_UPLOAD_INTENT_MISSING: ${profile}`)
        return uploadGeneratedImage({
          capability: intent.capability,
          file: variant.blob,
          uploadRef: intent.uploadRef,
        })
      }),
    )

    const result = await browserGraphQLRequest<
      ResultOf<typeof S.publishWallpaper>,
      VariablesOf<typeof S.publishWallpaper>
    >(S.publishWallpaper, {
      community,
      input: {
        baseVersion,
        idempotencyKey,
        settings,
        theme: toGraphqlTheme(theme),
        batchRef: batch.batchRef,
      },
    })
    return result.publishWallpaper
  } catch (error) {
    await cancelAssetsHubBatch(batch.batchRef, batch.batchCapability)
    throw error
  }
}

/** Exposes logic value state and actions through the shared React hook boundary. */
export function useLogicValue(): TWallpaperLogic {
  const wallpaper$ = useWallpaperDomain()
  const liveWallpaper$ = useWallpaperStore()
  const community$ = useCommunity()
  const publishedWallpaper$ = useStaticWallpaper()
  const { getWallpaper } = useFullWallpaper()
  const { isDarkTheme } = useTheme()
  const { t } = useTrans()
  const queryClient = useQueryClient()
  const [wallpaperStateVersion, setWallpaperStateVersion] = useState(
    () => publishedWallpaper$?.version ?? 0,
  )
  const pendingSaveRef = useRef<{ fingerprint: string; idempotencyKey: string } | null>(null)

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
    const theme: 'light' | 'dark' = isDarkTheme ? 'dark' : 'light'
    return Object.keys(getWallpaperThemeSavablePatch(wallpaper$, theme)).length > 0
  }, [isDarkTheme, wallpaper$.dark, wallpaper$.light, wallpaper$.original])

  const wallpaperMutation = useMutation({
    mutationKey: ['dsb', 'wallpaper', community$.slug],
    mutationFn: async ({
      community,
      baseVersion,
      idempotencyKey,
      submitted,
      theme,
    }: TWallpaperSaveRequest) => {
      const result = await publishWallpaperAssets(
        community,
        clone(liveWallpaper$[theme]),
        theme,
        baseVersion,
        idempotencyKey,
      )
      if (!result) throw new Error('WALLPAPER_PUBLISH_EMPTY_RESPONSE')
      return { result, submitted }
    },
    onSuccess: ({ result, submitted }, { community }) => {
      liveWallpaper$.acceptSubmitted(submitted)
      setWallpaperStateVersion(result.version)
      pendingSaveRef.current = null
      void queryClient.invalidateQueries({ queryKey: wallpaperKeys.config(community), exact: true })
      void queryClient.invalidateQueries({
        queryKey: wallpaperEditorKeys.config(community),
        exact: true,
      })
      toast(t('dsb.appearance.saved'), 'success')
    },
    onError: (err) => {
      console.error('## wallpaper publish error: ', err)
      if (graphqlErrorCode(err) === '5702' || graphqlErrorCode(err) === '5708') {
        void queryClient
          .fetchQuery(wallpaperQueries.config(community$.slug))
          .then((fresh) => setWallpaperStateVersion(fresh.wallpaper?.version ?? 0))
          .catch(() => undefined)
      }
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
    const theme = isDarkTheme ? 'dark' : 'light'
    const submittedTheme = clone(getWallpaperThemeSavablePatch(liveWallpaper$, theme))
    if (Object.keys(submittedTheme).length === 0) return
    const submitted = { [theme]: submittedTheme } as TWallpaperPatch
    const fingerprint = JSON.stringify({ baseVersion: wallpaperStateVersion, submitted, theme })
    const pending = pendingSaveRef.current
    const idempotencyKey =
      pending?.fingerprint === fingerprint ? pending.idempotencyKey : createIdempotencyKey()
    pendingSaveRef.current = { fingerprint, idempotencyKey }
    const params: TWallpaperSaveRequest = {
      baseVersion: wallpaperStateVersion,
      community,
      idempotencyKey,
      submitted,
      theme,
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
