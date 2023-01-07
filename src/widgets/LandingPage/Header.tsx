import { FC, useState } from 'react'

import { ROUTE } from '@/constant'

import Tooltip from '@/widgets/Tooltip'

import {
  Wrapper,
  Brand,
  BrandTitle,
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
} from './styles/header'

const Header: FC = () => {
  const [productActive, setProductActive] = useState(false)
  const [moreActive, setMoreActive] = useState(false)

  return (
    <Wrapper>
      <Brand>
        <BrandTitle>Groupher</BrandTitle>
      </Brand>
      <LinksWrapper>
        <Tooltip
          content={
            <Panel>
              <MenuItem href={`/${ROUTE.HOME}`}>讨论区</MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>看板</MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>更新日志</MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>帮助文档</MenuItem>
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

        <LinkItem href={`/${ROUTE.HOME}`}>价格</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}`}>社区</LinkItem>
        <Tooltip
          content={
            <Panel>
              <MenuItem href={`/${ROUTE.HOME}`}>团队博客</MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>看板</MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>更新日志</MenuItem>
              <MenuItem href={`/${ROUTE.HOME}/${ROUTE.DASHBOARD.DASHBOARD}`}>帮助文档</MenuItem>
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
        <RequestDemo>
          <DemoIcon />
          <div>预约演示</div>
        </RequestDemo>
      </RightSideInfo>
    </Wrapper>
  )
}

export default Header
