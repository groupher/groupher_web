/*
 *
 * CommunityDigest
 *
 */
import { FC, Fragment } from 'react'
// import { useRouter } from 'next/navigation'

import { BANNER_LAYOUT } from '@/constant/layout'
// import { ROUTE } from '@/constant/route'
import useBannerLayout from '@/hooks/useBannerLayout'

import { buildLog } from '@/logger'

import SidebarLayout from './SidebarLayout'
import TabberLayout from './TabberLayout'
import HeaderLayout from './HeaderLayout'

/* eslint-disable-next-line */
const log = buildLog('C:CommunityDigest')

const CommunityDigest: FC = () => {
  // const router = useRouter()
  const bannerLayout = useBannerLayout()

  // always use HeaderLayout in dashboard settings
  // if (router.pathname.split('/')[2] === ROUTE.DASHBOARD.OVERVIEW) {
  //   return <HeaderLayout />
  // }

  return (
    <Fragment>
      {bannerLayout === BANNER_LAYOUT.TABBER && <TabberLayout />}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && <SidebarLayout />}
      {bannerLayout === BANNER_LAYOUT.HEADER && <HeaderLayout />}
    </Fragment>
  )
}

export default CommunityDigest
