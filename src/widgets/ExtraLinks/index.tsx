import { FC } from 'react'
import { observer } from 'mobx-react'

import useBannerLayout from '@/hooks/useBannerLayout'
import { BANNER_LAYOUT } from '@/constant/layout'

import type { TProps } from './spec'

import HeaderLayout from './HeaderLayout'
import SidebarLayout from './SidebarLayout'

const ExtraLinks: FC<TProps> = (props) => {
  const bannerLayout = useBannerLayout()

  switch (bannerLayout) {
    case BANNER_LAYOUT.HEADER: {
      return <HeaderLayout {...props} />
    }

    case BANNER_LAYOUT.SIDEBAR: {
      return <SidebarLayout {...props} />
    }

    default: {
      return <HeaderLayout {...props} />
    }
  }
}

export default observer(ExtraLinks)
