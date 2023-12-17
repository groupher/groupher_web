/*
 *
 * CommunityDigest
 *
 */
import { FC, Fragment } from 'react'
// import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { BANNER_LAYOUT } from '@/constant/layout'
// import { ROUTE } from '@/constant/route'
import useBannerLayout from '@/hooks/useBannerLayout'

import { buildLog } from '@/logger'

import DashboardLayout from './DashboardLayout'
import SidebarLayout from './SidebarLayout'
import TabberLayout from './TabberLayout'
import HeaderLayout from './HeaderLayout'

const _log = buildLog('C:CommunityDigest')

const CommunityDigest: FC = () => {
  // const router = useRouter()
  const bannerLayout = useBannerLayout()
  const pathname = usePathname()

  if (pathname.split('/')[2] === 'dashboard') {
    return <DashboardLayout />
  }

  return (
    <Fragment>
      {bannerLayout === BANNER_LAYOUT.TABBER && <TabberLayout />}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && <SidebarLayout />}
      {bannerLayout === BANNER_LAYOUT.HEADER && <HeaderLayout />}
    </Fragment>
  )
}

export default CommunityDigest
