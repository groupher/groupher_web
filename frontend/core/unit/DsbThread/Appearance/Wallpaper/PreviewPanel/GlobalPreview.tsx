import { PAGE_BG_CSS_KEY } from '~/const/colors'
import { cn } from '~/css'
import { blurRGB } from '~/fmt'
import useCSSVar from '~/hooks/useCssVar'
import useGaussBlur from '~/hooks/useGaussBlur'
import useTheme from '~/hooks/useTheme'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import { THEME_PRESET_PAGE_BG_CSS_VAR } from '~/lib/theme'
import WallpaperPreview from '~/render/WallpaperPreview'
import { hasPreviewWallpaper } from '~/shell/GlobalLayout/background'
import { pickWallpaperThemeState } from '~/stores/wallpaper/helper'
import useWallpaperDomain from '~/stores/wallpaper/hooks'

import useSalon from './salon/global_preview'

export default function GlobalPreview() {
  const s = useSalon()

  const { isDarkTheme } = useTheme()
  const gaussBlur = useGaussBlur()
  const wallpaperState = pickWallpaperThemeState(useWallpaperDomain(), isDarkTheme)
  const hasWallpaper = hasPreviewWallpaper(wallpaperState)
  const pageBg = useCSSVar(PAGE_BG_CSS_KEY, [gaussBlur], { selector: 'main' })

  const bgColor = `${blurRGB(pageBg, gaussBlur)}`

  return (
    <div className={s.realPreview} style={{ backgroundColor: THEME_PRESET_PAGE_BG_CSS_VAR }}>
      <WallpaperPreview
        className={s.previewImage}
        patternSize={DEFAULT_WALLPAPER_PATTERN_SIZE}
        preferVgpu
        textureScale={0.72}
      />
      <div className={s.content} style={{ background: hasWallpaper ? bgColor : 'transparent' }}>
        <div className={s.contentTop}>
          <div className={cn(s.barBase, s.titleBar)} />
          <div className={cn(s.barBase, s.wideBar)} />
          <div className={cn(s.barBase, s.midBar)} />
          <div className={cn(s.barBase, s.longBar)} />
          <div className={cn(s.barBase, s.shortBar)} />
          <div className={cn(s.barBase, s.dimBar)} />
        </div>
        <div className={s.contentBottom}>
          <div className={cn(s.barBase, s.footerShort)} />
          <div className={cn(s.barBase, s.footerWide)} />
        </div>
      </div>
    </div>
  )
}
