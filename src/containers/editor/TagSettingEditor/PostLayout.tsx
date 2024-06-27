import { type FC, memo } from 'react'

import type { TPostLayout } from '~/spec'

import { POST_LAYOUT } from '~/const/layout'

import { Row, Br, Space, SpaceGrow } from '~/widgets/Common'
import CheckLabel from '~/widgets/CheckLabel'

import {
  Wrapper,
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
} from './styles/post_layout'

type TProps = {
  layout: string
  onChange: (layout: TPostLayout) => void
}

const PostListLayout: FC<TProps> = ({ layout, onChange }) => {
  return (
    <Wrapper>
      <Layout onClick={() => onChange(POST_LAYOUT.QUORA)}>
        <Block $active={layout === POST_LAYOUT.QUORA}>
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
          <CheckLabel title="经典" $active={layout === POST_LAYOUT.QUORA} top={15} left={-15} />
        </LayoutTitle>
      </Layout>
      <Layout onClick={() => onChange(POST_LAYOUT.PH)}>
        <Block $active={layout === POST_LAYOUT.PH}>
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
        <LayoutTitle $active={layout === POST_LAYOUT.PH}>
          <CheckLabel title="三段式" $active={layout === POST_LAYOUT.PH} top={15} left={-15} />
        </LayoutTitle>
      </Layout>

      <Layout onClick={() => onChange(POST_LAYOUT.MASONRY)}>
        <Block $active={layout === POST_LAYOUT.MASONRY}>
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

      <Layout onClick={() => onChange(POST_LAYOUT.MINIMAL)}>
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
          <CheckLabel title="极简" $active={layout === POST_LAYOUT.MINIMAL} top={15} left={-15} />
        </LayoutTitle>
      </Layout>

      <Layout onClick={() => onChange(POST_LAYOUT.COVER)}>
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
          <CheckLabel title="封面图" $active={layout === POST_LAYOUT.COVER} top={15} left={-15} />
        </LayoutTitle>
      </Layout>
    </Wrapper>
  )
}

export default memo(PostListLayout)
