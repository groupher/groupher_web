import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { KANBAN_LAYOUT } from '@/const/layout'
import { Br } from '@/widgets/Common'

import GlobalLayout from './GlobalLayout'
import ItemCardLayout from './ItemCardLayout'
import BgColorsSetter from './BgColorsSetter'

import useKanbanInfo from '../../hooks/useKanbanInfo'
import { Wrapper } from '../../styles/layout/kanban_layout'

const KanbanListLayout: FC = () => {
  const { layout } = useKanbanInfo()

  return (
    <Wrapper>
      <GlobalLayout />

      {layout === KANBAN_LAYOUT.CLASSIC && <ItemCardLayout />}

      <Br top={50} />
      <BgColorsSetter />
    </Wrapper>
  )
}

export default observer(KanbanListLayout)
