import { useEffect, useState } from 'react'
import Link from 'next/link'

import { assetSrc } from '~/helper'
import useViewingCommunity from '~/hooks/useViewingCommunity'
import useLayout from '~/hooks/useLayout'
import useHover from '~/hooks/useHover'

import { BRAND_LAYOUT } from '~/const/layout'

import OptionArrowSVG from '~/icons/OptionArrow'
import ArrowSVG from '~/icons/ArrowUpRight'
import DiscussSVG from '~/icons/Discuss'
import GithubSVG from '~/icons/Github8'
import GlobalSVG from '~/icons/social/Global'
import PlusSVG from '~/icons/PlusCircle'

import Img from '~/Img'

import Tooltip from '~/widgets/Tooltip'
import { SexyDivider } from '~/widgets/Common'
import ImgFallback from '~/widgets/ImgFallback'

import useSalon from '../styles/header_layout/community_brief'

export default () => {
  const s = useSalon()

  const [disableTippyJump, setDisableTippyJump] = useState(false)
  const { logo, title, slug, dashboard } = useViewingCommunity()
  const { brandLayout } = useLayout()

  const [ref, isHovering] = useHover<HTMLDivElement>()

  useEffect(() => {
    if (isHovering && disableTippyJump !== true) {
      setDisableTippyJump(true)
    }
  }, [isHovering, disableTippyJump])

  return (
    <Tooltip
      content={
        <div className={s.panel}>
          <div className={s.brandPanel}>
            {brandLayout !== BRAND_LAYOUT.TEXT && (
              <Img
                src={assetSrc(logo)}
                className={s.logo}
                noLazy
                fallback={<ImgFallback size={25} left={-2} right={3} title={title} />}
              />
            )}
            {brandLayout !== BRAND_LAYOUT.LOGO && <h1 className={s.title}>{title}</h1>}
          </div>

          <Link className={`${s.menuItem} hover:no-underline`} href={`/${slug}`}>
            <div className={s.menuIconBox}>
              <DiscussSVG className={s.menuIcon} />
            </div>

            <div className={s.menuTitle}>社区主页</div>
          </Link>

          <Link className={s.menuItem} href={dashboard?.baseInfo.homepage}>
            <div className={s.menuIconBox}>
              <GlobalSVG className={s.menuIcon} />
            </div>
            <div className={s.menuTitle}>返回官网</div>
            <ArrowSVG className={s.linkArrow} />
          </Link>

          <Link className={s.menuItem} href={`/${slug}`}>
            <div className={s.menuIconBox}>
              <GithubSVG className={`${s.menuIcon} size-3`} />
            </div>
            <div className={s.menuTitle}>Github</div>
            <ArrowSVG className={s.linkArrow} />
          </Link>

          <SexyDivider top={5} bottom={5} />
          <Link className={s.menuItem} href="/apply/community">
            <div className={s.menuIconBox}>
              <PlusSVG className={s.menuIcon} />
            </div>
            <div className={s.menuTitle}>新社区</div>
            <ArrowSVG className={s.linkArrow} />
          </Link>
        </div>
      }
      placement="bottom"
      hideOnClick={false}
      offset={[-3, -48]}
      trigger="click"
      onHide={() => setDisableTippyJump(false)}
      noPadding
    >
      <div className={s.wrapper} ref={ref}>
        {brandLayout !== BRAND_LAYOUT.TEXT && (
          <Img
            src={assetSrc(logo)}
            className={s.logo}
            fallback={<ImgFallback size={25} left={-2} right={3} title={title} />}
          />
        )}
        {brandLayout !== BRAND_LAYOUT.LOGO && <h1 className={s.title}>{title}</h1>}
        <OptionArrowSVG className={s.optionArrow} />
      </div>
    </Tooltip>
  )
}
