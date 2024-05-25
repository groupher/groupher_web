import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useBannerLayout from '@/hooks/useBannerLayout'
import useViewingThread from '@/hooks/useViewingThread'

import { BANNER_LAYOUT } from '@/const/layout'
import { THREAD } from '@/const/thread'

import type { TProps } from './spec'

import TabberLayout from './TabberLayout'
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
      return <TabberLayout {...props} />
    }
  }
}

export default observer(CustomHeaderLinks)
