import { FC, memo, useCallback } from 'react'
import { keys, includes } from 'ramda'

import type { TBannerLayout, TWallpaperGradient } from '@/spec'

import { parseWallpaper } from '@/utils/wallpaper'
import { callWallpaperEditor } from '@/signal'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import LayoutBall from './LayoutBall'

import {
  Wrapper,
  MainWrapper,
  Desc,
  BallWrapper,
  ColorBall,
  CustomBall,
  Divider,
  ThemeIcon,
} from '../styles/wallpaper_bar'

import { changeWallpaper } from '../logic'

type TProps = {
  wallpaper: string
  gradientWallpapers: Record<string, TWallpaperGradient>
  bannerLayout: TBannerLayout
  onLayoutChange: (bannerLayout: TBannerLayout) => void
}

const WallpaperBar: FC<TProps> = ({
  wallpaper,
  gradientWallpapers,
  bannerLayout,
  onLayoutChange,
}) => {
  const gradientKeys = keys(gradientWallpapers)

  const handleCallEditor = useCallback(() => callWallpaperEditor(), [])
  const isCustomWallpaper = wallpaper && !includes(wallpaper, gradientKeys)

  return (
    <Wrapper>
      <MainWrapper>
        {gradientKeys.map((name) => (
          <BallWrapper
            key={name}
            $active={name === wallpaper}
            onClick={() => changeWallpaper(name)}
          >
            <ColorBall
              $active={name === wallpaper}
              background={parseWallpaper(gradientWallpapers, name).background}
            />
          </BallWrapper>
        ))}
        <CustomBall onClick={() => handleCallEditor()} $active={isCustomWallpaper}>
          <ThemeIcon />
        </CustomBall>
        <Divider left={4} right={4} />
        <LayoutBall bannerLayout={bannerLayout} onLayoutChange={onLayoutChange} />
      </MainWrapper>
      <Desc>
        壁纸仅在宽屏模式下显示，更多自定义设置
        <ArrowButton fontSize={12} top={1} left={-3}>
          查看这里
        </ArrowButton>
      </Desc>
    </Wrapper>
  )
}

export default memo(WallpaperBar)
