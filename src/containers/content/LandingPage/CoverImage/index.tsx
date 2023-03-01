import { FC, memo } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TWallpaperInfo, TBannerLayout } from '@/spec'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

export type TProps = {
  wallpaperInfo: TWallpaperInfo
  bannerLayout: TBannerLayout
}

const CoverImage: FC<TProps> = (props) => {
  const { isMobile } = useMobileDetect()

  return isMobile ? <MobileView {...props} /> : <DesktopView {...props} />
}

export default memo(CoverImage)
