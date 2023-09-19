import { FC, memo } from 'react'
import { keys } from 'ramda'

import type { TWallpaperGradient } from '@/spec'
import { parseWallpaper } from '@/wallpaper'
import { WALLPAPER_TYPE } from '@/constant/wallpaper'

import {
  Wrapper,
  BallWrapper,
  ColorBall,
  CustomColorBall,
  PenWrapper,
  PenIcon,
} from '../styles/build_in/gradient_group'

import { changeGradientWallpaper, changeCustomGradientWallpaper } from '../logic'

type TProps = {
  wallpaper: string
  gradientWallpapers: Record<string, TWallpaperGradient>
}

const GradientGroup: FC<TProps> = ({ wallpaper, gradientWallpapers }) => {
  const gradientKeys = keys(gradientWallpapers)

  return (
    <Wrapper>
      {gradientKeys.map((name) => (
        <BallWrapper
          key={name}
          $active={name === wallpaper}
          onClick={() => changeGradientWallpaper(name)}
        >
          <ColorBall
            $active={name === wallpaper}
            background={parseWallpaper(gradientWallpapers, name).background}
          />
        </BallWrapper>
      ))}
      <BallWrapper
        $active={wallpaper === WALLPAPER_TYPE.CUSTOM_GRADIENT}
        onClick={() => changeCustomGradientWallpaper()}
      >
        <CustomColorBall>
          <PenWrapper>
            <PenIcon />
          </PenWrapper>
        </CustomColorBall>
      </BallWrapper>
    </Wrapper>
  )
}

export default memo(GradientGroup)
