import { keys } from 'ramda'

import { parseWallpaper } from '@/wallpaper'
import { WALLPAPER_TYPE } from '@/const/wallpaper'

import useLogic from '../useLogic'
import {
  Wrapper,
  BallWrapper,
  ColorBall,
  CustomColorBall,
  PenWrapper,
  PenIcon,
} from '../styles/build_in/gradient_group'

export default () => {
  const { getWallpaper, changeGradientWallpaper, changeCustomGradientWallpaper } = useLogic()

  const { wallpaper, gradientWallpapers } = getWallpaper()

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
