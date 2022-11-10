import { FC, memo } from 'react'
import { useRouter } from 'next/router'

import { ROUTE } from '@/constant'
import { getRouteMainPath } from '@/utils/route'

// import MoreLink from './MoreLink'
import { Wrapper, DotDivider, SiteLink } from '../styles/main_entries'

const splitMargin = 12

const DesktopView: FC = () => {
  const router = useRouter()
  const mainPath = getRouteMainPath(router.asPath)

  return (
    <Wrapper>
      <SiteLink
        href={`/${ROUTE.TOPICS}`}
        active={mainPath === ROUTE.TOPICS}
        testid="header-explore-link"
      >
        社区
      </SiteLink>
      <DotDivider space={splitMargin} />
      <SiteLink
        href={`/${ROUTE.WORKS}`}
        active={mainPath === ROUTE.WORKS}
        testid="header-works-link"
      >
        看板
      </SiteLink>
      <DotDivider space={splitMargin} />
      <SiteLink
        href={`/${ROUTE.COOL_GUIDE}`}
        active={mainPath === ROUTE.COOL_GUIDE}
        testid={`header-${ROUTE.COOL_GUIDE}`}
      >
        更新日志
      </SiteLink>
      {/* <DotDivider space={splitMargin} />
      <Link href={`/${ROUTE.MEETUPS}`} passHref>
        <SiteLink
          active={mainPath === ROUTE.MEETUPS}
          testid="header-meetups-link"
        >
          文章
        </SiteLink>
      </Link> */}
      <DotDivider space={splitMargin} />
      <SiteLink
        href={`/${ROUTE.HAVE_A_DRINK}`}
        active={mainPath === ROUTE.HAVE_A_DRINK}
        testid={`header-${ROUTE.HAVE_A_DRINK}`}
      >
        帮助台
      </SiteLink>
      <DotDivider space={splitMargin} />
      <SiteLink
        href={`/${ROUTE.HAVE_A_DRINK}`}
        active={mainPath === ROUTE.HAVE_A_DRINK}
        testid={`header-${ROUTE.HAVE_A_DRINK}`}
      >
        关于
      </SiteLink>
      {/* <DotDivider space={splitMargin} />
      <MoreLink /> */}
    </Wrapper>
  )
}

export default memo(DesktopView)
