import { FC, useState } from 'react'

import { ROUTE } from '@/constant/route'

import { DesktopOnly } from '@/widgets/Common'
import Tooltip from '@/widgets/Tooltip'

import MobileMenu from './MobileMenu'

import {
  Wrapper,
  Brand,
  BrandTitle,
  BrandLogo,
  LinksWrapper,
  LinkItem,
  MoreLink,
  ArrowIcon,
  RequestDemo,
  DemoIcon,
  RightSideInfo,
  Divider,
  GithubIcon,
  Panel,
  MenuItem,
  MenuTitle,
  MenuDesc,
  MobileRightSide,
} from './styles'

const HomeHeader: FC = () => {
  const [productActive, setProductActive] = useState(false)
  const [moreActive, setMoreActive] = useState(false)

  return (
    <Wrapper>
      <Brand href="/">
        <BrandLogo src="/groupher-alpha.png" />
        <BrandTitle>Groupher</BrandTitle>
      </Brand>
      <LinksWrapper>
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
          noPadding
        >
          <MoreLink $active={productActive}>
            产品 <ArrowIcon />
          </MoreLink>
        </Tooltip>

        <LinkItem href={`/${ROUTE.HOME}`}>社区</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}`}>开发计划</LinkItem>
        <Tooltip
          content={
            <Panel width="120px">
              <MenuItem href={`/${ROUTE.HOME}`} noDesc>
                <MenuTitle>团队博客</MenuTitle>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`} noDesc>
                <MenuTitle>帮助文档</MenuTitle>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`} noDesc>
                <MenuTitle>更新日志</MenuTitle>
              </MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`} noDesc>
                <MenuTitle>自定义</MenuTitle>
              </MenuItem>
            </Panel>
          }
          placement="bottom"
          trigger="mouseenter focus"
          offset={[-5, 5]}
          onShow={() => setMoreActive(true)}
          onHide={() => setMoreActive(false)}
          noPadding
        >
          <MoreLink $active={moreActive}>
            了解更多 <ArrowIcon />
          </MoreLink>
        </Tooltip>
      </LinksWrapper>

      <RightSideInfo>
        <GithubIcon />
        <Divider left={14} right={12} />
        <RequestDemo href={`/${ROUTE.BOOK_DEMO}`}>
          <DemoIcon />
          <div>预约演示</div>
        </RequestDemo>
      </RightSideInfo>

      <MobileRightSide>
        <GithubIcon />
        <Divider left={14} right={12} />
        <MobileMenu />
      </MobileRightSide>
    </Wrapper>
  )
}

export default HomeHeader
