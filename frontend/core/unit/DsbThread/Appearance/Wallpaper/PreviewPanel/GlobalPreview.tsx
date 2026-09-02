import { PAGE_BG_CSS_KEY } from '~/const/colors'
import { blurRGB } from '~/fmt'
import useCSSVar from '~/hooks/useCssVar'
import useGaussBlur from '~/hooks/useGaussBlur'
import { DEFAULT_WALLPAPER_PATTERN_SIZE } from '~/lib/bg'
import WallpaperPreview from '~/render/WallpaperPreview'

import useSalon, { cnMerge } from './salon/global_preview'

export default function GlobalPreview() {
  const s = useSalon()

  const gaussBlur = useGaussBlur()
  const pageBg = useCSSVar(PAGE_BG_CSS_KEY, [gaussBlur], { selector: 'main' })

  const bgColor = `${blurRGB(pageBg, gaussBlur)}`

  return (
    <div className={s.realPreview}>
      <WallpaperPreview
        className={s.previewImage}
        patternSize={DEFAULT_WALLPAPER_PATTERN_SIZE}
        preferVgpu
        textureScale={0.72}
      />
      <div className={s.content} style={{ background: bgColor }}>
        <div className={s.contentTop}>
          <div className={cnMerge(s.bar, s.titleBar)} />
          <div className={cnMerge(s.bar, s.wideBar)} />
          <div className={cnMerge(s.bar, s.midBar)} />
          <div className={cnMerge(s.bar, s.longBar)} />
          <div className={cnMerge(s.bar, s.shortBar)} />
          <div className={cnMerge(s.bar, s.dimBar)} />
        </div>
        <div className={s.contentBottom}>
          <div className={cnMerge(s.bar, s.footerShort)} />
          <div className={cnMerge(s.bar, s.footerWide)} />
        </div>
      </div>
    </div>
  )
}
