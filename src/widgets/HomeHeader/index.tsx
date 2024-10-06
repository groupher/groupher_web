import { type FC, useState, memo } from 'react'
import Link from 'next/link'

import { ROUTE } from '~/const/route'
import useSession from '~/hooks/useSession'

import ArrowSVG from '~/icons/ArrowSimple'
import DemoSVG from '~/icons/DemoTV'

import Tooltip from '~/widgets/Tooltip'
import CommunityBrand from '~/widgets/CommunityBrand'

import useSalon, {
  cn,
  RightSideInfo,
  Divider,
  GithubIcon,
  Panel,
  MenuItem,
  MenuTitle,
  MenuDesc,
} from './styles'

const HomeHeader: FC = () => {
  const s = useSalon()

  const [productActive, setProductActive] = useState(false)
  const [moreActive, setMoreActive] = useState(false)

  useSession()

  return (
    <div className={s.wrapper}>
      <Link href="/" className={s.brand}>
        <CommunityBrand landingBrand />
      </Link>
      <div className={s.links}>
        <Tooltip
          content={
            <Panel width="220px">
              <MenuItem href={`/${ROUTE.HOME}`}>
                <MenuTitle>讨论区</MenuTitle>
                <MenuDesc>讨论，投票功能需求，问题等</MenuDesc>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.KANBAN}`}>
                <MenuTitle>看板</MenuTitle>
                <MenuDesc>公开的开发计划，产品路线图</MenuDesc>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.CHANGELOG}`}>
                <MenuTitle>更新日志</MenuTitle>
                <MenuDesc>产品更新详情，版本说明等</MenuDesc>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>
                <MenuTitle>帮助文档</MenuTitle>
                <MenuDesc>常见问题，使用引导，开发指南等</MenuDesc>
              </MenuItem>
            </Panel>
          }
          placement="bottom"
          trigger="mouseenter focus"
          offset={[-5, 5]}
          onShow={() => setProductActive(true)}
          onHide={() => setProductActive(false)}
          delay={200}
          noPadding
        >
          <div className={cn(s.stackLink, productActive && s.linkActive)}>
            产品 <ArrowSVG className={s.arrowIcon} />
          </div>
        </Tooltip>

        <Link className={s.linkItem} href={`/${ROUTE.HOME}`}>
          社区
        </Link>
        <Link className={s.linkItem} href={`/${ROUTE.HOME}/${ROUTE.KANBAN}`}>
          开发计划
        </Link>
        <Link className={s.linkItem} href={`/${ROUTE.PRICE}`}>
          价格
        </Link>
        <Tooltip
          content={
            <Panel width="120px">
              <MenuItem href={`/${ROUTE.HOME}`} noDesc>
                <MenuTitle>团队博客</MenuTitle>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.OVERVIEW}`} noDesc>
                <MenuTitle>帮助文档</MenuTitle>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.OVERVIEW}`} noDesc>
                <MenuTitle>更新日志</MenuTitle>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.OVERVIEW}`} noDesc>
                <MenuTitle>自定义</MenuTitle>
              </MenuItem>
            </Panel>
          }
          placement="bottom"
          trigger="mouseenter focus"
          offset={[-5, 5]}
          onShow={() => setMoreActive(true)}
          onHide={() => setMoreActive(false)}
          delay={200}
          noPadding
        >
          <div className={cn(s.stackLink, moreActive && s.linkActive)}>
            了解更多 <ArrowSVG className={s.arrowIcon} />
          </div>
        </Tooltip>
      </div>

      <RightSideInfo>
        <GithubIcon />
        <Divider left={14} right={12} />
        <Link className={s.requestDemoLink} href={`/${ROUTE.BOOK_DEMO}`}>
          <DemoSVG className={s.demoIcon} />
          <div>预约演示</div>
        </Link>
      </RightSideInfo>
    </div>
  )
}

export default memo(HomeHeader)
