import { KANBAN_LAYOUT } from '~/const/layout'
import { Br } from '~/widgets/Common'

import GlobalLayout from './GlobalLayout'
import ItemCardLayout from './ItemCardLayout'
import BgColorsSetter from './BgColorsSetter'

import useKanban from '../../logic/useKanban'
import useSalon from '../../salon/layout/kanban_layout'

export default () => {
  const { kanbanLayout } = useKanban()
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <GlobalLayout />

      {kanbanLayout === KANBAN_LAYOUT.CLASSIC && <ItemCardLayout />}

      <Br top={50} />
      <BgColorsSetter />
    </div>
  )
}
