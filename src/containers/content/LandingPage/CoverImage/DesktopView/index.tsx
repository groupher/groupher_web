import { FC } from 'react'

import DesktopDevice from './DesktopDevice'
import DashboardDevice from './DashboardDevice'
import MobileDevice from './MobileDevice'

import { Wrapper } from '../../styles/cover_image/desktop_view'

import type { TProps } from '..'

const CoverImage: FC<TProps> = (props) => {
  return (
    <Wrapper>
      <DesktopDevice {...props} />
      <DashboardDevice />
      <MobileDevice {...props} />
    </Wrapper>
  )
}

export default CoverImage
