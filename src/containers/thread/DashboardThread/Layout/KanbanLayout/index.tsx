import { KANBAN_LAYOUT } from '~/const/layout'
import { Br } from '~/widgets/Common'

import GlobalLayout from './GlobalLayout'
import ItemCardLayout from './ItemCardLayout'
import BgColorsSetter from './BgColorsSetter'

import useKanban from '../../logic/useKanban'
import { Wrapper } from '../../styles/layout/kanban_layout'

export default () => {
  const { kanbanLayout } = useKanban()

  return (
    <Wrapper>
      <GlobalLayout />

      {kanbanLayout === KANBAN_LAYOUT.CLASSIC && <ItemCardLayout />}

      <Br top={50} />
      <BgColorsSetter />
    </Wrapper>
  )
}
