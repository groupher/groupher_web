import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { KANBAN_CARD_LAYOUT } from '@/constant/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Space, SpaceGrow, Brick } from '@/widgets/Common'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import type { TProps as TPropsBase } from '.'
import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Footer,
  UpvoteIcon,
  CommentIcon,
} from '../../styles/layout/kanban_layout/item_card_layout'
import { edit } from '../../logic'

type TProps = Pick<TPropsBase, 'cardLayout' | 'isTouched' | 'saving'>

const KanbanItemLayout: FC<TProps> = ({ cardLayout, isTouched, saving }) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <SectionLabel
        title="看板卡片布局"
        desc="「看板」卡片的显示样式，只在整体布局为「经典」时有效。"
      />
      <SelectWrapper>
        <Layout onClick={() => edit(KANBAN_CARD_LAYOUT.SIMPLE, 'kanbanCardLayout')}>
          <Block $active={cardLayout === KANBAN_CARD_LAYOUT.SIMPLE} $color={primaryColor}>
            <Brick $width={30} $height={5} $opacity={0.3} top={18} left={15} />
            <Brick $width={128} $height={10} $opacity={0.4} top={32} />
            <Brick $width={38} $height={5} $opacity={0.2} bottom={14} right={10} />
            <Footer bottom={10}>
              <UpvoteIcon size={15} />
              <Space right={12} />
              <CommentIcon />
              <SpaceGrow />
            </Footer>
          </Block>
          <LayoutTitle $active={cardLayout === KANBAN_CARD_LAYOUT.SIMPLE}>
            <CheckLabel
              title="简洁"
              $active={cardLayout === KANBAN_CARD_LAYOUT.SIMPLE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(KANBAN_CARD_LAYOUT.FULL, 'kanbanCardLayout')}>
          <Block $active={cardLayout === KANBAN_CARD_LAYOUT.FULL} $color={primaryColor}>
            <Brick $width={30} $height={5} $opacity={0.3} top={15} left={15} />
            <Brick $width={128} $height={8} $opacity={0.4} top={28} />
            <Brick $width={80} $height={5} $opacity={0.2} top={44} />

            <Brick $width={10} $height={10} $opacity={0.4} bottom={12} left={34} $radius={100} />
            <Brick $width={10} $height={10} $opacity={0.4} bottom={12} left={48} $radius={100} />
            <Brick $width={10} $height={10} $opacity={0.4} bottom={12} left={62} $radius={100} />

            <Footer bottom={10}>
              <UpvoteIcon size={15} />
              <Space right={200} />
              <CommentIcon />
            </Footer>
          </Block>
          <LayoutTitle $active={cardLayout === KANBAN_CARD_LAYOUT.FULL}>
            <CheckLabel
              title="摘要"
              $active={cardLayout === KANBAN_CARD_LAYOUT.FULL}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        width="540px"
        isTouched={isTouched}
        field={SETTING_FIELD.KANBAN_CARD_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}

export default observer(KanbanItemLayout)
