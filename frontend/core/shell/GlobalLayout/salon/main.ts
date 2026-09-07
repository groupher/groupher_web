import useTheme from '~/hooks/useTheme'
import useTopbar from '~/hooks/useTopbar'
import useTwBelt from '~/hooks/useTwBelt'
import type { TContainerMetric } from '~/hooks/useTwBelt/spec'
import { hasPreviewWallpaper, hasPublishedWallpaper } from '~/shell/GlobalLayout/background'
import useStaticWallpaper from '~/stores/staticWallpaper/hooks'
import { pickWallpaperThemeState } from '~/stores/wallpaper/helper'
import useWallpaperDomain from '~/stores/wallpaper/hooks'
import useWallpaperRuntimeMode from '~/stores/wallpaperRuntime/hooks'

type TProps = {
  containerMetric: TContainerMetric | null
}

export default function useSalon({ containerMetric }: TProps) {
  const { cn, rainbow, container, containerWrapper, vividDark, page } = useTwBelt()

  const { topbarBg } = useTopbar()
  const { isDarkTheme } = useTheme()
  const runtimeMode = useWallpaperRuntimeMode()
  const publishedWallpaper = useStaticWallpaper()
  const wallpaper = useWallpaperDomain()
  const wallpaperTheme = pickWallpaperThemeState(wallpaper, isDarkTheme)
  const theme = isDarkTheme ? 'dark' : 'light'
  const hasWallpaper =
    runtimeMode === 'editor'
      ? hasPreviewWallpaper(wallpaperTheme)
      : hasPublishedWallpaper(publishedWallpaper, theme)

  return {
    wrapper: cn(
      containerWrapper(),
      'column relative isolate s-full min-h-fit',
      'transition-transform transition-shadow',
      hasWallpaper && wallpaperTheme.contentShadow.enabled && 'shadow-lg',
      page(),
    ),
    topBar: cn('h-0.5 w-full absolute top-0 left-0 z-20', rainbow(topbarBg, 'bg'), vividDark()),
    // Dedicated full-page surface for high-frequency theme background preview.
    // Keep --preview-page-bg here instead of wrapper/<main>; this is the only
    // layer that owns the Content surface color and backdrop blur.
    background: 'pointer-events-none abs-full z-0',
    hasWallpaper,
    scrollWrapper: 'absolute w-full',
    body: 'relative z-10 w-full',
    inner: cn(
      'column-align-both w-full',
      container(),
      containerMetric && container(containerMetric),
    ),
    footer: 'relative z-10 w-full',
  }
}
