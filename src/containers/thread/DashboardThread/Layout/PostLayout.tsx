import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TPostLayout } from '@/spec'

import { POST_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { callDashboardDesc } from '@/signal'

import { Row, Br, Space, SpaceGrow, Inline } from '@/widgets/Common'
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
  Border,
  Block,
  Bar,
  Circle,
  Box,
  Cover,
  Column,
  UpvoteIcon,
  CommentIcon,
} from '../styles/layout/post_layout'
import { edit } from '../logic'

type TProps = {
  layout: TPostLayout
  isTouched: boolean
  saving: boolean
}

const PostListLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <SectionLabel
        title="讨论区布局"
        desc={
          <>
            「讨论区」列表的默认布局，同时可对不同标签设置不同的布局，切换布局不影响已发布内容。
            <Inline>
              <ArrowButton
                onClick={() => callDashboardDesc(DASHBOARD_DESC_LAYOUT.POST_LIST)}
                fontSize={12}
              >
                查看示例
              </ArrowButton>
            </Inline>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(POST_LAYOUT.QUORA, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.QUORA} $color={primaryColor}>
            <Bar thin long={30} />
            <Br bottom={7} />
            <Row>
              <Bar long={60} />
              <Space right={5} />
              <Bar thin long={8} />
              <SpaceGrow />
              <CommentIcon />
            </Row>
            <Br bottom={10} />

            <Bar long={80} thin />
            <Br bottom={10} />
            <Row>
              <UpvoteIcon size={15} />
              <Space right={5} />
              <Bar long={12} />
              <Space right={15} />
              <Bar long={12} thin />
            </Row>
          </Block>
          <LayoutTitle $active={layout === POST_LAYOUT.QUORA}>
            <CheckLabel
              title="经典（默认）"
              $active={layout === POST_LAYOUT.QUORA}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(POST_LAYOUT.PH, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.PH} $color={primaryColor}>
            <Row>
              <Column center>
                <Circle />
                <Br bottom={18} />
              </Column>
              <Space right={12} />
              <Column grow>
                <Row>
                  <Bar long={50} />
                  <Space right={5} />
                  <Bar thin long={8} />
                  <SpaceGrow />
                  <UpvoteIcon size={20} />
                </Row>
                <Br bottom={5} />
                <Bar thin long={80} />
                <Br bottom={11} />
                <Row>
                  <Bar long={20} />
                  <Space right={12} />
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </Block>
          <LayoutTitle $active={layout === POST_LAYOUT.PH}>
            <CheckLabel title="三段式" $active={layout === POST_LAYOUT.PH} top={15} left={-15} />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(POST_LAYOUT.MASONRY, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.MASONRY} $color={primaryColor}>
            <Row>
              <Column grow>
                <Box />
                <Bar thin long={70} />
              </Column>
              <Space right={12} />
              <Column grow>
                <Box />
                <Bar thin long={80} />
              </Column>
            </Row>
          </Block>
          <LayoutTitle $active={layout === POST_LAYOUT.MASONRY}>
            <CheckLabel
              title="瀑布流卡片"
              $active={layout === POST_LAYOUT.MASONRY}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(POST_LAYOUT.MINIMAL, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.MINIMAL} $color={primaryColor}>
            <Row>
              <Space right={5} />
              <Column center>
                <Border>
                  <UpvoteIcon size={14} />
                  <Br bottom={3} />
                  <Bar long={70} />
                </Border>
              </Column>

              <Space right={15} />

              <Column grow>
                <Br bottom={10} />
                <Row>
                  <Br bottom={10} />
                  <Bar long={30} />
                  <SpaceGrow />
                  <CommentIcon />
                </Row>
                <Br bottom={11} />
                <Bar thin long={80} />
                <Br bottom={10} />
                <Row>
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </Block>
          <LayoutTitle $active={layout === POST_LAYOUT.MINIMAL}>
            <CheckLabel title="极简" $active={layout === POST_LAYOUT.MINIMAL} top={15} left={-15} />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(POST_LAYOUT.COVER, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.COVER} $color={primaryColor}>
            <Row>
              <Cover />
              <Space right={17} />
              <Column grow>
                <Column>
                  <Bar long={50} />
                </Column>
                <Br bottom={10} />
                <Bar thin long={90} />
                <Br bottom={20} />
                <Row>
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </Block>
          <LayoutTitle $active={layout === POST_LAYOUT.COVER}>
            <CheckLabel title="封面图" $active={layout === POST_LAYOUT.COVER} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        width="84%"
        isTouched={isTouched}
        field={SETTING_FIELD.POST_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}

export default observer(PostListLayout)
