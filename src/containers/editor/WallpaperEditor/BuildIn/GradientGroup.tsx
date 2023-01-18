import { FC, memo } from 'react'
import { keys } from 'ramda'

import type { TWallpaperGradient } from '@/spec'
import { parseWallpaper } from '@/utils/wallpaper'
import { WALLPAPER_CUSTOM } from '@/constant/wallpaper'

import { Wrapper, BallWrapper, ColorBall, CustomColorBall } from '../styles/build_in/gradient_group'

import { changeWallpaper } from '../logic'

type TProps = {
  wallpaper: string
  gradientWallpapers: Record<string, TWallpaperGradient>
}

const GradientGroup: FC<TProps> = ({ wallpaper, gradientWallpapers }) => {
  const gradientKeys = keys(gradientWallpapers)

  return (
    <Wrapper>
      {gradientKeys.map((name) => (
        <BallWrapper key={name} $active={name === wallpaper} onClick={() => changeWallpaper(name)}>
          <ColorBall
            $active={name === wallpaper}
            background={parseWallpaper(gradientWallpapers, name).background}
          />
        </BallWrapper>
      ))}
      <BallWrapper
        $active={wallpaper === WALLPAPER_CUSTOM}
        onClick={() => changeWallpaper(WALLPAPER_CUSTOM)}
      >
        <CustomColorBall />
      </BallWrapper>
    </Wrapper>
  )
}

export default memo(GradientGroup)
