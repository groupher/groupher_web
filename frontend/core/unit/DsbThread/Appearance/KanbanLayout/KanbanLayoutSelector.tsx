import { KANBAN_LAYOUT } from '~/const/layout'
import { cn } from '~/css'
import useTrans from '~/hooks/useTrans'
import CheckLabel from '~/ui/CheckLabel'

import { FIELD } from '../../constant'
import useKanban from '../../logic/useKanban'
import SavingBar from '../../SavingBar'
import SectionLabel from '../../SectionLabel'
import KanbanLayoutPreview from './KanbanLayoutPreview'
import useSalon from './salon/layout_selector'

export default function KanbanLayoutSelector() {
  const s = useSalon()
  const { t } = useTrans()

  const { kanbanLayout: layout, isKanbanLayoutTouched: isTouched, edit } = useKanban()

  return (
    <>
      <SectionLabel
        title={t('dsb.appearance.kanban.global.title')}
        desc={t('dsb.appearance.kanban.global.desc')}
        touched={isTouched}
      />
      <div className={s.select}>
        <button
          type='button'
          className={s.layout}
          aria-pressed={layout === KANBAN_LAYOUT.CLASSIC}
          onClick={() => edit(KANBAN_LAYOUT.CLASSIC, FIELD.KANBAN_LAYOUT)}
        >
          <div
            className={s.block({
              state: layout === KANBAN_LAYOUT.CLASSIC ? 'active' : 'idle',
            })}
          >
            <div className={s.frame}>
              <div className={s.toolbar}>
                <div className={cn(s.barBase, s.toolbarLeft)} />
                <div className={cn(s.barBase, s.toolbarRight)} />
              </div>
              <KanbanLayoutPreview layout={KANBAN_LAYOUT.CLASSIC} />
            </div>
          </div>
          <CheckLabel
            title={t('dsb.appearance.kanban.global.option.classic')}
            active={layout === KANBAN_LAYOUT.CLASSIC}
            top={4}
          />
        </button>
        <button
          type='button'
          className={s.layout}
          aria-pressed={layout === KANBAN_LAYOUT.WATERFALL}
          onClick={() => edit(KANBAN_LAYOUT.WATERFALL, FIELD.KANBAN_LAYOUT)}
        >
          <div
            className={s.block({
              state: layout === KANBAN_LAYOUT.WATERFALL ? 'active' : 'idle',
            })}
          >
            <div className={s.frame}>
              <div className={s.toolbar}>
                <div className={cn(s.barBase, s.toolbarLeft)} />
                <div className={cn(s.barBase, s.toolbarRight)} />
              </div>
              <KanbanLayoutPreview layout={KANBAN_LAYOUT.WATERFALL} />
            </div>
          </div>
          <CheckLabel
            title={t('dsb.appearance.kanban.global.option.waterfall')}
            active={layout === KANBAN_LAYOUT.WATERFALL}
            top={4}
          />
        </button>
      </div>

      <SavingBar isTouched={isTouched} field={FIELD.KANBAN_LAYOUT} top={8} bottom={20} />
    </>
  )
}
