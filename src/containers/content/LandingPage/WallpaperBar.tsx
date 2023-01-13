import { FC, memo, useCallback } from 'react'
import { keys } from 'ramda'

import type { TWallpaperGradient } from '@/spec'
import { ROUTE } from '@/constant/route'

import { parseWallpaper } from '@/utils/wallpaper'
import { callWallpaperEditor } from '@/utils/signal'

import {
  Wrapper,
  MainWrapper,
  Desc,
  DescLink,
  ArrowIcon,
  BallWrapper,
  ColorBall,
  CustomBall,
} from './styles/wallpaper_bar'

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
        <CustomBall onClick={() => handleCallEditor()}>T</CustomBall>
      </MainWrapper>
      <Desc>
        壁纸仅在宽屏模式下显示，更多自定义设置
        <DescLink href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>
          查看这里 <ArrowIcon />
        </DescLink>
      </Desc>
    </Wrapper>
  )
}

export default memo(WallpaperBar)
