import { type FC, memo } from 'react'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const CoverImage: FC = () => {
  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  )
}

export default memo(CoverImage)
