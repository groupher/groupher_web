import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { KANBAN_CARD_LAYOUT, DASHBOARD_DESC_LAYOUT } from '@/constant/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { callDashboardDesc } from '@/signal'

import { Inline, Brick } from '@/widgets/Common'
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
} from '../../styles/layout/kanban_layout/global_layout'
import { edit } from '../../logic'

type TProps = Omit<TPropsBase, 'kanbanBgColors' | 'isBgColorsTouched'>

const KanbanGlobalLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  const primaryColor = usePrimaryColor()

  return (
    <>
      <SectionLabel
        title="整体布局"
        desc={
          <>
            「看板」的整体布局，切换不影响内容。
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
            <Brick top={15} left={20} $height={6} $width={40} $opacity={0.2} />
            <Brick top={15} right={20} $height={6} $width={25} $opacity={0.1} />

            <Brick bottom={0} left={13} $height={140} $width={78} $opacity={0.06} />
            <Brick bottom={105} left={20} $height={25} $width={63} $opacity={0.2} />
            <Brick bottom={72} left={20} $height={25} $width={63} $opacity={0.16} />
            <Brick bottom={40} left={20} $height={25} $width={63} $opacity={0.13} />
            <Brick bottom={8} left={20} $height={25} $width={63} $opacity={0.1} />

            <Brick bottom={0} left={100} $height={140} $width={78} $opacity={0.06} />
            <Brick bottom={105} left={108} $height={25} $width={63} $opacity={0.2} />
            <Brick bottom={72} left={108} $height={25} $width={63} $opacity={0.16} />
            <Brick bottom={40} left={108} $height={25} $width={63} $opacity={0.13} />
            <Brick bottom={8} left={108} $height={25} $width={63} $opacity={0.1} />

            <Brick bottom={0} left={188} $height={140} $width={78} $opacity={0.06} />
            <Brick bottom={105} left={195} $height={25} $width={63} $opacity={0.2} />
            <Brick bottom={72} left={195} $height={25} $width={63} $opacity={0.16} />
            <Brick bottom={40} left={195} $height={25} $width={63} $opacity={0.13} />
            <Brick bottom={8} left={195} $height={25} $width={63} $opacity={0.1} />
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
            <Brick top={15} left={20} $height={6} $width={40} $opacity={0.2} />
            <Brick top={15} right={20} $height={6} $width={25} $opacity={0.1} />

            <Brick bottom={122} left={13} $height={16} $width={250} $opacity={0.04} />
            <Brick bottom={127} left={20} $height={5} $width={30} $opacity={0.2} />

            <Brick bottom={110} left={20} $height={4} $width={70} $opacity={0.3} />
            <Brick bottom={110} right={20} $height={4} $width={30} $opacity={0.25} />
            <Brick bottom={110} right={58} $height={4} $width={18} $opacity={0.2} />

            <Brick bottom={100} left={20} $height={4} $width={100} $opacity={0.3} />
            <Brick bottom={100} right={20} $height={4} $width={30} $opacity={0.25} />
            <Brick bottom={100} right={58} $height={4} $width={18} $opacity={0.2} />

            <Brick bottom={90} left={20} $height={4} $width={80} $opacity={0.2} />
            <Brick bottom={90} right={20} $height={4} $width={30} $opacity={0.15} />
            <Brick bottom={90} right={58} $height={4} $width={18} $opacity={0.1} />

            <Brick bottom={62} left={13} $height={16} $width={250} $opacity={0.04} />
            <Brick bottom={67} left={20} $height={5} $width={30} $opacity={0.2} />

            <Brick bottom={50} left={20} $height={4} $width={110} $opacity={0.3} />
            <Brick bottom={50} right={20} $height={4} $width={30} $opacity={0.28} />
            <Brick bottom={50} right={58} $height={4} $width={20} $opacity={0.22} />

            <Brick bottom={40} left={20} $height={4} $width={80} $opacity={0.3} />
            <Brick bottom={40} right={20} $height={4} $width={30} $opacity={0.25} />
            <Brick bottom={40} right={58} $height={4} $width={20} $opacity={0.08} />

            <Brick bottom={13} left={13} $height={16} $width={250} $opacity={0.04} />
            <Brick bottom={20} left={20} $height={3} $width={30} $opacity={0.2} />
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

export default observer(KanbanGlobalLayout)
