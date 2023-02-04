import { FC, memo } from 'react'

import type { TBannerLayout } from '@/spec'

import { BANNER_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { callDashboardDesc } from '@/utils/signal'

import { Row, Br, Space, SpaceGrow } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  DividerLine,
  Block,
  Bar,
  Circle,
  Main,
  ListsWrapper,
  TagsWrapper,
  SidebarWrapper,
} from '../styles/layout/banner_layout'
import { edit } from '../logic'

type TProps = {
  layout: TBannerLayout
  isTouched: boolean
  saving: boolean
}

const BannerLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="整体布局"
        desc={
          <>
            整体页面的 Header 布局，适用于除文章页的所有页面。
            <ArrowButton
              onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
              size="small"
              linkColor
              top={-1}
            >
              查看示例
            </ArrowButton>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(BANNER_LAYOUT.HEADER, 'bannerLayout')}>
          <Block $active={layout === BANNER_LAYOUT.HEADER}>
            <Row>
              <Bar thin long={16} />
              <Space right={42} />
              <Bar thin long={40} />
              <Space right={45} />
              <Bar thin long={6} />
              <Space right={5} />
              <Circle radius={6} />
            </Row>

            <DividerLine top={10} bottom={20} />

            <Main>
              <ListsWrapper>
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
              </ListsWrapper>
              <TagsWrapper>
                <Bar long={100} />
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </TagsWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === BANNER_LAYOUT.HEADER}>
            <CheckLabel
              title="标题式"
              $active={layout === BANNER_LAYOUT.HEADER}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(BANNER_LAYOUT.TABBER, 'bannerLayout')}>
          <Block $active={layout === BANNER_LAYOUT.TABBER}>
            <Row>
              <Bar long={16} />
              <SpaceGrow />
              <Bar thin long={6} />
              <Space right={5} />
              <Circle radius={6} />
            </Row>

            <Br bottom={16} />
            <Row>
              <Bar thin long={10} />
              <Space right={10} />
              <Bar thin long={10} />
              <Space right={10} />
              <Bar thin long={10} />
              <Space right={10} />
              <Bar thin long={10} />
            </Row>
            <DividerLine top={5} bottom={20} />

            <Main>
              <ListsWrapper>
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
              </ListsWrapper>
              <TagsWrapper>
                <Bar long={100} />
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </TagsWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === BANNER_LAYOUT.TABBER}>
            <CheckLabel
              title="标签卡式"
              $active={layout === BANNER_LAYOUT.TABBER}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(BANNER_LAYOUT.SIDEBAR, 'bannerLayout')}>
          <Block $active={layout === BANNER_LAYOUT.SIDEBAR}>
            <Row>
              <Space right={110} />
              <Bar thin long={10} />
              <SpaceGrow />
              <Space right={5} />
              <Circle radius={6} />
            </Row>
            <Main>
              <SidebarWrapper>
                <Bar long={100} />
                <Br bottom={15} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={85} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
                <Br bottom={15} />
                <DividerLine top={6} bottom={12} />
                <Bar long={50} thin />
                <Br bottom={6} />
                <Bar long={60} thin />
                <Br bottom={6} />
                <Bar long={50} thin />
              </SidebarWrapper>
              <Space right={50} />
              <ListsWrapper noBorder>
                <DividerLine top={5} bottom={20} />
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
                <Bar long={60} thin />
                <Br bottom={14} />
                <Bar long={50} thin />
                <Br bottom={14} />
                <Bar long={55} thin />
                <Br bottom={14} />
                <Bar long={40} thin />
                <Br bottom={14} />
              </ListsWrapper>
            </Main>
          </Block>
          <LayoutTitle $active={layout === BANNER_LAYOUT.SIDEBAR}>
            <CheckLabel
              title="边栏式"
              $active={layout === BANNER_LAYOUT.SIDEBAR}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.BANNER_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}

export default memo(BannerLayout)
