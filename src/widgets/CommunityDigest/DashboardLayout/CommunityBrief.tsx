import Link from 'next/link'

import useViewingCommunity from '~/hooks/useViewingCommunity'
import usePublicThreads from '~/hooks/usePublicThreads'
import useLayout from '~/hooks/useLayout'

import { BRAND_LAYOUT } from '~/const/layout'

import { assetSrc } from '~/helper'
// import { titleCase } from '~/fmt'

import Img from '~/Img'
import ArrowSVG from '~/icons/ArrowUpRight'
// import DiscussSVG from '~/icons/Discuss'
// import KanbanSVG from '~/icons/Kanban'
import AboutSVG from '~/icons/Info'
// import GuideSVG from '~/icons/Guide'
// import ChangelogSVG from '~/icons/TadaRaw'

import GithubSVG from '~/icons/Github8'
import GlobalSVG from '~/icons/social/Global'
import PlusSVG from '~/icons/PlusCircle'

import OptionArrowSVG from '~/icons/OptionArrow'
import { Space, SexyDivider } from '~/widgets/Common'
import Tooltip from '~/widgets/Tooltip'
import ImgFallback from '~/widgets/ImgFallback'

import useSalon, { cn } from '../salon/dashboard_layout/community_brief'

export default () => {
  const s = useSalon()

  const threads = usePublicThreads()
  const { title, logo, slug, dashboard } = useViewingCommunity()
  const { brandLayout } = useLayout()

  return (
    <div className={s.wrapper}>
      {brandLayout !== BRAND_LAYOUT.TEXT && (
        <Img
          className={s.logo}
          src={assetSrc(logo)}
          fallback={<ImgFallback size={25} title={title} />}
        />
      )}
      {brandLayout !== BRAND_LAYOUT.LOGO && <div className={s.title}>{title}</div>}
      <div className={s.slash}>/</div>

      <Tooltip
        content={
          <div className={s.topPanel}>
            {threads.map((item) => {
              // const ThreadIcon = Icon[titleCase(item.slug)]
              return (
                <Link key={item.slug} className={s.panelItem} href={`/${slug}/${item.slug}`}>
                  <>TODO</>
                  {/* <ThreadIcon /> */}
                  <div>{item.title}</div>
                </Link>
              )
            })}

            <Link className={s.panelItem} href={`/${slug}/about`}>
              <AboutSVG className={s.icon} />
              <div>关于</div>
            </Link>

            <SexyDivider top={5} bottom={5} />

            <Link className={cn(s.panelItem, s.outside)} href={dashboard.baseInfo.homepage}>
              <GlobalSVG className={s.icon} />
              <div>返回官网</div>
              <div className="grow" />
              <ArrowSVG className={s.arrowIcon} />
            </Link>

            <Link className={cn(s.panelItem, s.outside)} href={`/${slug}`}>
              <GithubSVG className={s.icon} />
              <div>Github</div>
              <div className="grow" />
              <ArrowSVG className={s.arrowIcon} />
            </Link>

            <SexyDivider top={5} bottom={5} />
            <Link className={cn(s.panelItem, s.outside)} href="/apply/community">
              <PlusSVG className={s.icon} />
              <div>新社区</div>
              <div className="grow" />
              <ArrowSVG className={s.arrowIcon} />
            </Link>
          </div>
        }
        placement="bottom"
        hideOnClick={false}
        offset={[-7, -39]}
        trigger="click"
        noPadding
      >
        <div className={s.menuWrapper}>
          <div className={s.title}>管理后台</div>
          <Space right={12} />
          <OptionArrowSVG className={s.optArrowIcon} />
        </div>
      </Tooltip>
    </div>
  )
}
