/*
 *
 * KanbanItem
 *
 */

import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'
import useKanbanCardLayout from '@/hooks/useKanbanCardLayout'
import { KANBAN_CARD_LAYOUT } from '@/const/layout'

// import IconButton from '@/widgets/Buttons/IconButton'

import Full from './Full'
import Simple from './Simple'

type TProps = {
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ article }) => {
  const layout = useKanbanCardLayout()

  return layout === KANBAN_CARD_LAYOUT.FULL ? (
    <Full article={article} />
  ) : (
    <Simple article={article} />
  )
}

export default observer(KanbanItem)
