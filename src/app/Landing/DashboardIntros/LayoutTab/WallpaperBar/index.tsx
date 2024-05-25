import { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { keys, includes } from 'ramda'

import useWallpaper from '@/hooks/useWallpaper'
import useGlowLight from '@/hooks/useGlowLight'

import { parseWallpaper } from '@/wallpaper'
import { callWallpaperEditor } from '@/signal'
import { GRADIENT_WALLPAPER_NAME } from '@/const/wallpaper'
import { GLOW_EFFECT_NAME } from '@/const/glow_effect'

import {
  Wrapper,
  MainWrapper,
  BallWrapper,
  ColorBall,
  CustomBall,
  ThemeIcon,
} from '../../../styles/dashboard_intros/layout_tab/wallpaper_bar'

const WallpaperBar: FC = () => {
  const { wallpaper, gradientWallpapers, changeWallpaper } = useWallpaper()
  const { changeGlowEffect } = useGlowLight()

  const gradientKeys = keys(gradientWallpapers)

  const handleCallEditor = useCallback(() => callWallpaperEditor(), [])
  const changeGlow = useCallback(
    (wallpaper) => {
      switch (wallpaper) {
        case GRADIENT_WALLPAPER_NAME.PINK: {
          changeGlowEffect(GLOW_EFFECT_NAME.ORANGE_PURPLE)
          return
        }
        case GRADIENT_WALLPAPER_NAME.GREEN: {
          changeGlowEffect(GLOW_EFFECT_NAME.GREY_GREEN)
          return
        }
        case GRADIENT_WALLPAPER_NAME.GREY: {
          changeGlowEffect(GLOW_EFFECT_NAME.GREY_BROWN)
          return
        }
        case GRADIENT_WALLPAPER_NAME.ORANGE: {
          changeGlowEffect(GLOW_EFFECT_NAME.YELLOW_RED)
          return
        }
        case GRADIENT_WALLPAPER_NAME.PURPLE:
        case GRADIENT_WALLPAPER_NAME.BLUE: {
          changeGlowEffect(GLOW_EFFECT_NAME.PURPLE_BLUE)
          return
        }
        default: {
          // pic/custom wallpaper
          changeGlowEffect('')
        }
      }
    },
    [changeGlowEffect],
  )

  const isCustomWallpaper = wallpaper && !includes(wallpaper, gradientKeys)

  return (
    <Wrapper>
      <MainWrapper>
        {gradientKeys.map((name) => (
          <BallWrapper
            key={name}
            $active={name === wallpaper}
            onClick={() => {
              changeWallpaper(name)
              changeGlow(name)
            }}
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
      </MainWrapper>
    </Wrapper>
  )
}

export default observer(WallpaperBar)
