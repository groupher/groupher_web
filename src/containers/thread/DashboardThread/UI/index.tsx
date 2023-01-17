import { FC, memo } from 'react'

import { Divider } from '@/widgets/Common'

import Portal from '../Portal'
import PrimaryColor from './PrimaryColor'
import GlowEffect from './GlowEffect'
import Wallpaper from './Wallpaper'

import type { TUiSettings, TTouched } from '../spec'
import { Wrapper } from '../styles/ui'

type TProps = {
  settings: TUiSettings
  touched: TTouched
}

const UI: FC<TProps> = ({ settings, touched }) => {
  const { primaryColor, wallpaper, saving, hasWallpaperShadow, glowType, glowFixed, glowOpacity } =
    settings

  return (
    <Wrapper>
      <Portal title="外观布局" desc="社区基本外观，主题色，以及常见布局自定义。" />
      <PrimaryColor primaryColor={primaryColor} isTouched={touched.glowFixed} saving={saving} />
      <Divider top={20} bottom={60} />
      <Wallpaper wallpaper={wallpaper} hasShadow={hasWallpaperShadow} />
      <Divider top={20} bottom={60} />
      <GlowEffect
        glowType={glowType}
        glowFixed={glowFixed}
        glowOpacity={glowOpacity}
        isTouched={touched.glowType}
        isGrowFixedTouched={touched.glowFixed}
        isGrowOpacityTouched={touched.glowOpacity}
        saving={saving}
      />
    </Wrapper>
  )
}

export default memo(UI)
