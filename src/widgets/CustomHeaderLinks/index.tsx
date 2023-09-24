import { FC } from 'react'
import { observer } from 'mobx-react'

import useBannerLayout from '@/hooks/useBannerLayout'
import useViewingThread from '@/hooks/useViewingThread'

import { BANNER_LAYOUT } from '@/constant/layout'
import { THREAD } from '@/constant/thread'

import type { TProps } from './spec'

import HeaderLayout from './HeaderLayout'
import SidebarLayout from './SidebarLayout'

const CustomHeaderLinks: FC<TProps> = (props) => {
  const bannerLayout = useBannerLayout()
  const activeThread = useViewingThread()

  if (activeThread === THREAD.DASHBOARD) {
    return <HeaderLayout {...props} />
  }

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

export default observer(CustomHeaderLinks)
