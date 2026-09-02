import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import WallpaperPreview from '~/render/WallpaperPreview'

import useSalon, { cnMerge } from './salon/auth_preview'

export default function AuthPreview() {
  const s = useSalon()

  return (
    <div className={s.realPreview}>
      <WallpaperPreview
        className={s.previewImage}
        patternSize={DEFAULT_WALLPAPER_PATTERN_SIZE}
        preferVgpu
        textureScale={0.72}
      />
      <div className={s.authCard}>
        <div className={cnMerge(s.bar, s.authTitle)} />
        <div className={s.authInput} />
        <div className={s.authInput} />
        <div className={s.authButton} />
      </div>
    </div>
  )
}
