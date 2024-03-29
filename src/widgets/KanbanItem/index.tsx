/*
 *
 * KanbanItem
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'
import useKanbanLayout from '@/hooks/useKanbanLayout'
import { KANBAN_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/logger'

// import IconButton from '@/widgets/Buttons/IconButton'

import WaterfallLayout from './WaterfallLayout'
import ClassicLayout from './ClassicLayout'

const _log = buildLog('w:KanbanItem:index')

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
