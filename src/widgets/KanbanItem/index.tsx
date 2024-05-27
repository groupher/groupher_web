/*
 *
 * KanbanItem
 *
 */

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'
import useKanbanLayout from '@/hooks/useKanbanLayout'
import { KANBAN_LAYOUT } from '@/const/layout'

// import IconButton from '@/widgets/Buttons/IconButton'

import WaterfallLayout from './WaterfallLayout'
import ClassicLayout from './ClassicLayout'

type TProps = {
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ article }) => {
  const layout = useKanbanLayout()

  return layout === KANBAN_LAYOUT.WATERFALL ? (
    <WaterfallLayout article={article} />
  ) : (
    <ClassicLayout article={article} />
  )
}

export default observer(KanbanItem)
