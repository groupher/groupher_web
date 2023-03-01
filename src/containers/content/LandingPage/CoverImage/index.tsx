import { FC, memo } from 'react'

import type { TWallpaperInfo, TBannerLayout } from '@/spec'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

export type TProps = {
  wallpaperInfo: TWallpaperInfo
  bannerLayout: TBannerLayout
}

const CoverImage: FC<TProps> = (props) => {
  return (
    <>
      <MobileView {...props} />
      <DesktopView {...props} />
    </>
  )
}

export default memo(CoverImage)
