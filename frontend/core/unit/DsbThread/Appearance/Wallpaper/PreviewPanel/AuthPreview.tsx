import { cn } from '~/css'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import { THEME_PRESET_PAGE_BG_CSS_VAR } from '~/lib/theme'
import WallpaperPreview from '~/render/WallpaperPreview'

import useSalon from './salon/auth_preview'

export default function AuthPreview() {
  const s = useSalon()

  return (
    <div className={s.realPreview} style={{ backgroundColor: THEME_PRESET_PAGE_BG_CSS_VAR }}>
      <WallpaperPreview
        className={s.previewImage}
        patternSize={DEFAULT_WALLPAPER_PATTERN_SIZE}
        preferVgpu
        textureScale={0.72}
      />
      <div className={s.authCard}>
        <div className={cn(s.barBase, s.authTitle)} />
        <div className={s.authInput} />
        <div className={s.authInput} />
        <div className={s.authButton} />
      </div>
    </div>
  )
}
