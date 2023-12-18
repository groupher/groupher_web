/*
 *
 * KanbanItem
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'
import useKanbanCardLayout from '@/hooks/useKanbanCardLayout'
import { KANBAN_CARD_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/logger'

// import IconButton from '@/widgets/Buttons/IconButton'

import Full from './Full'
import Simple from './Simple'

const _log = buildLog('w:KanbanItem:index')

type TProps = {
  article: TArticle
  noBg?: boolean
}

const KanbanItem: FC<TProps> = ({ article, noBg = false }) => {
  const layout = useKanbanCardLayout()

  return layout === KANBAN_CARD_LAYOUT.FULL ? (
    <Full article={article} noBg={noBg} />
  ) : (
    <Simple article={article} noBg={noBg} />
  )
}

export default observer(KanbanItem)
