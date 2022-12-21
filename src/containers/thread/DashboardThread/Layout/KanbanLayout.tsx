import { FC, memo } from 'react'

import type { TKanbanLayout } from '@/spec'

import { KANBAN_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant'
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
  Column,
  UpvoteIcon,
  CommentIcon,
} from '../styles/ui/kanban_layout'
import { edit } from '../logic'

type TProps = {
  layout: TKanbanLayout
  isTouched: boolean
  saving: boolean
}

const PostListLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  return (
    <Wrapper>
      <SectionLabel
        title="看板布局"
        desc={
          <>
            「看板」列表的默认布局，同时可对不同标签设置不同的布局，切换布局不影响已发布内容。
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
        <Layout onClick={() => edit(KANBAN_LAYOUT.SIMPLE, 'kanbanLayout')}>
          <Block $active={layout === KANBAN_LAYOUT.SIMPLE}>
            <Bar thin long={15} />
            <Br bottom={15} />
            <Row>
              <Bar long={60} />
              <SpaceGrow />
            </Row>
            <Br bottom={20} />
            <Row>
              <UpvoteIcon size={15} />
              <Space right={12} />
              <CommentIcon />
              <SpaceGrow />
              <Bar long={12} thin />
            </Row>
          </Block>
          <LayoutTitle $active={layout === KANBAN_LAYOUT.SIMPLE}>
            <CheckLabel
              title="简洁"
              $active={layout === KANBAN_LAYOUT.SIMPLE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(KANBAN_LAYOUT.FULL, 'kanbanLayout')}>
          <Block $active={layout === KANBAN_LAYOUT.FULL}>
            <Bar thin long={15} />
            <Br bottom={10} />
            <Row>
              <Bar long={60} />
              <SpaceGrow />
            </Row>
            <Row>
              <Br bottom={20} />
              <Bar long={80} thin />
              <SpaceGrow />
            </Row>
            <Br bottom={8} />
            <Row>
              <UpvoteIcon size={15} />
              <Space right={2} />
              <Bar long={4} />
              <Space right={2} />
              <Bar long={4} />
              <Space right={2} />
              <Bar long={4} />
              <Space right={12} />
              <SpaceGrow />
              <Bar long={12} thin />
            </Row>
          </Block>
          <LayoutTitle $active={layout === KANBAN_LAYOUT.FULL}>
            <CheckLabel title="摘要" $active={layout === KANBAN_LAYOUT.FULL} top={15} left={-15} />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.KANBAN_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}

export default memo(PostListLayout)
