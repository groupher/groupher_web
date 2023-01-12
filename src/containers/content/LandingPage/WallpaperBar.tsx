import { FC, memo, useCallback } from 'react'
import { keys } from 'ramda'

import type { TWallpaperGradient } from '@/spec'

import { parseWallpaper } from '@/utils/wallpaper'
import { callWallpaperEditor } from '@/utils/signal'

import { Wrapper, Block, BallWrapper, ColorBall, CustomBall } from './styles/wallpaper_bar'

import { changeWallpaper } from './logic'

type TProps = {
  wallpaper: string
  gradientWallpapers: Record<string, TWallpaperGradient>
}

const WallpaperBar: FC<TProps> = ({ wallpaper, gradientWallpapers }) => {
  const gradientKeys = keys(gradientWallpapers)

  const handleCallEditor = useCallback(() => callWallpaperEditor(), [])

  return (
    <Wrapper>
      {gradientKeys.map((name) => (
        <Block key={name}>
          <BallWrapper $active={name === wallpaper} onClick={() => changeWallpaper(name)}>
            <ColorBall
              $active={name === wallpaper}
              background={parseWallpaper(gradientWallpapers, name).background}
            />
          </BallWrapper>
        </Block>
      ))}
      <CustomBall onClick={() => handleCallEditor()}>T</CustomBall>
    </Wrapper>
  )
}

export default memo(WallpaperBar)
