import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { KANBAN_CARD_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { callDashboardDesc } from '@/signal'

import { Row, Br, Space, SpaceGrow, Inline } from '@/widgets/Common'
import ArrowButton from '@/widgets/Buttons/ArrowButton'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import type { TProps as TPropsBase } from '.'
import {
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Bar,
  UpvoteIcon,
  CommentIcon,
} from '../../styles/layout/kanban_layout/item_layout'
import { edit } from '../../logic'

type TProps = Omit<TPropsBase, 'kanbanBgColors' | 'isBgColorsTouched'>

const KanbanItemLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  const primaryColor = usePrimaryColor()

  return (
    <>
      <SectionLabel
        title="看板布局"
        desc={
          <>
            「看板」列表的默认布局，同时可对不同标签设置不同的布局，切换布局不影响已发布内容。
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
        <Layout onClick={() => edit(KANBAN_CARD_LAYOUT.SIMPLE, 'kanbanCardLayout')}>
          <Block $active={layout === KANBAN_CARD_LAYOUT.SIMPLE} $color={primaryColor}>
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
          <LayoutTitle $active={layout === KANBAN_CARD_LAYOUT.SIMPLE}>
            <CheckLabel
              title="简洁"
              $active={layout === KANBAN_CARD_LAYOUT.SIMPLE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(KANBAN_CARD_LAYOUT.FULL, 'kanbanCardLayout')}>
          <Block $active={layout === KANBAN_CARD_LAYOUT.FULL} $color={primaryColor}>
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
          <LayoutTitle $active={layout === KANBAN_CARD_LAYOUT.FULL}>
            <CheckLabel
              title="摘要"
              $active={layout === KANBAN_CARD_LAYOUT.FULL}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.KANBAN_CARD_LAYOUT}
        loading={saving}
        top={20}
      />
    </>
  )
}

export default observer(KanbanItemLayout)
