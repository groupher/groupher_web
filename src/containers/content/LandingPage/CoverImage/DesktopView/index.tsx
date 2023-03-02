/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react'
import { Parallax } from 'react-scroll-parallax'

import DesktopDevice from './DesktopDevice'
import DashboardDevice from './DashboardDevice'
import MobileDevice from './MobileDevice'

import { Wrapper, ParallaxWrapper, FreeLabel } from '../../styles/cover_image/desktop_view'

import type { TProps } from '..'

const CoverImage: FC<TProps> = (props) => {
  const { wallpaperInfo } = props
  const { wallpaper } = wallpaperInfo

  return (
    <Wrapper>
      <DesktopDevice {...props} />
      <FreeLabel wallpaper={wallpaper}>It's free !</FreeLabel>
      <Parallax speed={2} translateX={[0, 0]}>
        <ParallaxWrapper>
          <DashboardDevice />
          <MobileDevice {...props} />
        </ParallaxWrapper>
      </Parallax>
    </Wrapper>
  )
}

export default CoverImage
