import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { KANBAN_LAYOUT } from '@/const/layout'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Brick } from '@/widgets/Common'
import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import useKanbanInfo from '../../hooks/useKanbanInfo'
import {
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
} from '../../styles/layout/kanban_layout/global_layout'
import { edit } from '../../logic'

const KanbanGlobalLayout: FC = () => {
  const { layout, isTouched, saving } = useKanbanInfo()
  const primaryColor = usePrimaryColor()

  return (
    <>
      <SectionLabel title="整体布局" desc="「看板」的整体布局，切换不影响内容。" />
      <SelectWrapper>
        <Layout onClick={() => edit(KANBAN_LAYOUT.CLASSIC, 'kanbanLayout')}>
          <Block $active={layout === KANBAN_LAYOUT.CLASSIC} $color={primaryColor}>
            <Brick top={15} left={20} $height={6} $width={40} $opacity={0.2} />
            <Brick top={15} right={20} $height={6} $width={25} $opacity={0.1} />

            <Brick bottom={0} left={13} $height={140} $width={78} $opacity={0.06} />
            <Brick bottom={105} left={20} $height={25} $width={63} $opacity={0.1} />
            <Brick bottom={72} left={20} $height={25} $width={63} $opacity={0.1} />
            <Brick bottom={40} left={20} $height={25} $width={63} $opacity={0.08} />
            <Brick bottom={8} left={20} $height={25} $width={63} $opacity={0.05} />

            <Brick bottom={0} left={100} $height={140} $width={78} $opacity={0.06} />
            <Brick bottom={105} left={108} $height={25} $width={63} $opacity={0.1} />
            <Brick bottom={72} left={108} $height={25} $width={63} $opacity={0.1} />
            <Brick bottom={40} left={108} $height={25} $width={63} $opacity={0.08} />
            <Brick bottom={8} left={108} $height={25} $width={63} $opacity={0.05} />

            <Brick bottom={0} left={188} $height={140} $width={78} $opacity={0.06} />
            <Brick bottom={105} left={195} $height={25} $width={63} $opacity={0.1} />
            <Brick bottom={72} left={195} $height={25} $width={63} $opacity={0.1} />
            <Brick bottom={40} left={195} $height={25} $width={63} $opacity={0.08} />
            <Brick bottom={8} left={195} $height={25} $width={63} $opacity={0.05} />
          </Block>
          <LayoutTitle $active={layout === KANBAN_LAYOUT.CLASSIC}>
            <CheckLabel
              title="经典"
              $active={layout === KANBAN_LAYOUT.CLASSIC}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(KANBAN_LAYOUT.WATERFALL, 'kanbanLayout')}>
          <Block $active={layout === KANBAN_LAYOUT.WATERFALL} $color={primaryColor}>
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
          <LayoutTitle $active={layout === KANBAN_LAYOUT.WATERFALL}>
            <CheckLabel
              title="瀑布"
              $active={layout === KANBAN_LAYOUT.WATERFALL}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>

      <SavingBar
        width="605px"
        isTouched={isTouched}
        field={SETTING_FIELD.KANBAN_LAYOUT}
        loading={saving}
        top={20}
        bottom={30}
      />
    </>
  )
}

export default observer(KanbanGlobalLayout)
