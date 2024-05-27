/*
 *
 * CommunityDigest
 *
 */
import { type FC, Fragment } from 'react'
// import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { BANNER_LAYOUT } from '@/const/layout'
// import { ROUTE } from '@/const/route'
import useBannerLayout from '@/hooks/useBannerLayout'

import DashboardLayout from './DashboardLayout'
import SidebarLayout from './SidebarLayout'
import TabberLayout from './TabberLayout'
import HeaderLayout from './HeaderLayout'

const CommunityDigest: FC = () => {
  // const router = useRouter()
  const bannerLayout = useBannerLayout()
  const pathname = usePathname()

  // return <HeaderLayout />

  // return (
  //   <>
  //     <Link href="/home/post">讨论区</Link>
  //     <Link href="/home/kanban">看板</Link>
  //     <HeaderLayout />
  //   </>
  // )

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
