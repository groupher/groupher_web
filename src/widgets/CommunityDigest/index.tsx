/*
 *
 * CommunityDigest
 *
 */
import { FC, Fragment } from 'react'
import { useRouter } from 'next/router'

import { BANNER_LAYOUT } from '@/constant/layout'
import { ROUTE } from '@/constant/route'
import useBannerLayout from '@/hooks/useBannerLayout'

import { buildLog } from '@/logger'

import SidebarLayout from './SidebarLayout'
import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

/* eslint-disable-next-line */
const log = buildLog('C:CommunityDigest')

const CommunityDigest: FC = () => {
  const router = useRouter()
  const bannerLayout = useBannerLayout()

  // always use SimpleLayout in dashboard settings
  if (router.pathname.split('/')[2] === ROUTE.DASHBOARD.DASHBOARD) {
    return <SimpleLayout />
  }

  return (
    <Fragment>
      {bannerLayout === BANNER_LAYOUT.TABBER && <ClassicLayout />}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && <SidebarLayout />}
      {bannerLayout === BANNER_LAYOUT.HEADER && <SimpleLayout />}
    </Fragment>
  )
}

export default CommunityDigest
