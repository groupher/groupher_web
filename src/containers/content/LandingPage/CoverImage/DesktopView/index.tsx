import { FC } from 'react'
import { Parallax } from 'react-scroll-parallax'

import DesktopDevice from './DesktopDevice'
import DashboardDevice from './DashboardDevice'
import MobileDevice from './MobileDevice'

import { Wrapper, ParallaxWrapper } from '../../styles/cover_image/desktop_view'

import type { TProps } from '..'

const CoverImage: FC<TProps> = (props) => {
  return (
    <Wrapper>
      <DesktopDevice {...props} />
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
