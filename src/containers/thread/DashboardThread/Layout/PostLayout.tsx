import { FC, memo } from 'react'

import type { TPostLayout } from '@/spec'

import { POST_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import { callDashboardDesc } from '@/utils/signal'

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
  Block,
  Bar,
  Circle,
  Box,
  Cover,
  Column,
  UpvoteIcon,
  CommentIcon,
} from '../styles/ui/post_layout'
import { edit } from '../logic'

type TProps = {
  layout: TPostLayout
  isTouched: boolean
  saving: boolean
}

const PostListLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
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
                size="tiny"
                arrowStyle="simple"
              >
                查看示例
              </ArrowButton>
            </Inline>
          </>
        }
      />
      <SelectWrapper>
        <Layout onClick={() => edit(POST_LAYOUT.UPVOTE_FIRST, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.UPVOTE_FIRST}>
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
          <LayoutTitle $active={layout === POST_LAYOUT.UPVOTE_FIRST}>
            <CheckLabel
              title="投票列表"
              $active={layout === POST_LAYOUT.UPVOTE_FIRST}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(POST_LAYOUT.COMMENT_FIRST, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.COMMENT_FIRST}>
            <Row>
              <Column center>
                <Circle />
                <Br bottom={8} />
                <UpvoteIcon size={13} />
                <Br bottom={3} />
                <Bar long={50} />
              </Column>

              <Space right={12} />

              <Column grow>
                <Row>
                  <Bar long={50} />
                  <Space right={5} />
                  <Bar thin long={8} />
                  <SpaceGrow />
                  <Bar long={20} />
                </Row>
                <Br bottom={8} />
                <Bar thin long={20} />
                <Br bottom={11} />
                <Bar thin long={80} />
                <Br bottom={10} />
                <Row>
                  <Bar long={20} />
                  <Space right={12} />
                  <Bar thin long={20} />
                </Row>
              </Column>
            </Row>
          </Block>
          <LayoutTitle $active={layout === POST_LAYOUT.COMMENT_FIRST}>
            <CheckLabel
              title="评论列表"
              $active={layout === POST_LAYOUT.COMMENT_FIRST}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(POST_LAYOUT.CARD, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.CARD}>
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
          <LayoutTitle $active={layout === POST_LAYOUT.CARD}>
            <CheckLabel
              title="卡片列表"
              $active={layout === POST_LAYOUT.CARD}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(POST_LAYOUT.MINIMAL, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.MINIMAL}>
            <Row>
              <Space right={5} />
              <Column center>
                <UpvoteIcon size={14} />
                <Br bottom={3} />
                <Bar long={70} />
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
            <CheckLabel
              title="极简列表"
              $active={layout === POST_LAYOUT.MINIMAL}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>

        <Layout onClick={() => edit(POST_LAYOUT.COVER, 'postLayout')}>
          <Block $active={layout === POST_LAYOUT.COVER}>
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
            <CheckLabel
              title="封面图列表"
              $active={layout === POST_LAYOUT.COVER}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.POST_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}

export default memo(PostListLayout)
