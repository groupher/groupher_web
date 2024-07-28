import { useEffect, useState } from 'react'
import Link from 'next/link'

import { assetSrc } from '~/helper'
import useViewingCommunity from '~/hooks/useViewingCommunity'
import useLayout from '~/hooks/useLayout'
import useHover from '~/hooks/useHover'

import { BRAND_LAYOUT } from '~/const/layout'

import OptionArrowSVG from '~/icons/OptionArrow'
import ArrowSVG from '~/icons/ArrowUpRight'
import Img from '~/Img'

import Tooltip from '~/widgets/Tooltip'
import { SpaceGrow, SexyDivider } from '~/widgets/Common'
import ImgFallback from '~/widgets/ImgFallback'

import useSalon, { Icon, DisableTippyJump } from '../styles/header_layout/community_brief'

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
              <Img src={assetSrc(logo)} className={s.logo} noLazy />
            )}
            {brandLayout !== BRAND_LAYOUT.LOGO && <h1 className={s.title}>{title}</h1>}
          </div>

          <Link className={`${s.menuItem} hover:no-underline`} href={`/${slug}`}>
            <Icon.Discuss />
            <div>社区主页</div>
          </Link>

          <Link className={s.menuItem} href={dashboard?.baseInfo.homepage}>
            <Icon.Global />
            <div>返回官网</div>
            <SpaceGrow />
            <ArrowSVG className={s.linkArrow} />
          </Link>

          <Link className={s.menuItem} href={`/${slug}`}>
            <Icon.Github />
            <div>Github</div>
            <SpaceGrow />
            <ArrowSVG className={s.linkArrow} />
          </Link>

          <SexyDivider top={5} bottom={5} />
          <Link className={s.menuItem} href="/apply/community">
            <Icon.Plus />
            <div>新社区</div>
            <SpaceGrow />
            <ArrowSVG className={s.linkArrow} />
          </Link>
        </div>
      }
      placement="bottom"
      hideOnClick={false}
      offset={[-7, -39]}
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
        <SpaceGrow />
        <OptionArrowSVG className={s.optionArrow} />
        <DisableTippyJump enable={disableTippyJump} />
      </div>
    </Tooltip>
  )
}
