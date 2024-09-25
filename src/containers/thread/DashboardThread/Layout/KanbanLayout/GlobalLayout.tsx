import { KANBAN_LAYOUT } from '~/const/layout'

import { Brick } from '~/widgets/Common'
import CheckLabel from '~/widgets/CheckLabel'

import { SETTING_FIELD } from '../../constant'
import SectionLabel from '../../SectionLabel'
import SavingBar from '../../SavingBar'

import useKanban from '../../logic/useKanban'
import useSalon, { cn } from '../../styles/layout/kanban_layout/global_layout'

export default () => {
  const s = useSalon()

  const { kanbanLayout: layout, getKanbanLayoutTouched, saving, edit } = useKanban()
  const isTouched = getKanbanLayoutTouched()

  return (
    <>
      <SectionLabel title="整体布局" desc="「看板」的整体布局，切换不影响内容。" />
      <div className={s.select}>
        <div className={s.layout} onClick={() => edit(KANBAN_LAYOUT.CLASSIC, 'kanbanLayout')}>
          <div className={cn(s.block, layout === KANBAN_LAYOUT.CLASSIC && s.blockActive)}>
            <div className={cn(s.bar, 'w-10')} />
            <div className={cn(s.bar, 'w-6 right-5 opacity-30')} />

            <div className={cn(s.bar, s.board, 'left-3')} />
            <div className={cn(s.bar, s.item, 'left-5 top-14 opacity-35')} />
            <div className={cn(s.bar, s.item, 'left-5 top-24 opacity-20 -mt-1')} />

            <div className={cn(s.bar, s.board, 'left-24 ml-1')} />
            <div className={cn(s.bar, s.item, 'left-24 top-14 opacity-35 ml-3')} />
            <div className={cn(s.bar, s.item, 'left-24 top-24 opacity-25 -mt-1 ml-3')} />
            <div className={cn(s.bar, s.item, 'left-24 bottom-9 opacity-15 ml-3')} />
            <div className={cn(s.bar, s.item, 'left-24 bottom-0 opacity-10 ml-3')} />

            <div className={cn(s.bar, s.board, 'right-4 ml-1')} />
            <div className={cn(s.bar, s.item, 'right-6 top-14 opacity-35')} />
            <div className={cn(s.bar, s.item, 'right-6 top-24 opacity-25 -mt-1')} />
            <div className={cn(s.bar, s.item, 'right-6 bottom-9 opacity-15')} />
          </div>
          <CheckLabel title="经典" active={layout === KANBAN_LAYOUT.CLASSIC} top={4} />
        </div>
        <div className={s.layout} onClick={() => edit(KANBAN_LAYOUT.WATERFALL, 'kanbanLayout')}>
          <div className={cn(s.block, layout === KANBAN_LAYOUT.WATERFALL && s.blockActive)}>
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
          </div>
          <CheckLabel title="瀑布" active={layout === KANBAN_LAYOUT.WATERFALL} top={4} />
        </div>
      </div>

      <SavingBar
        width="w-11/12"
        isTouched={isTouched}
        field={SETTING_FIELD.KANBAN_LAYOUT}
        loading={saving}
        top={8}
        bottom={20}
      />
    </>
  )
}
