/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react'

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
      <ParallaxWrapper>
        <DashboardDevice />
        <MobileDevice {...props} />
      </ParallaxWrapper>
    </Wrapper>
  )
}

export default CoverImage
