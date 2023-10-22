/*
 *
 * KanbanItem
 *
 */

import { FC, memo } from 'react'

import type { TArticle, TKanbanLayout } from '@/spec'
import { KANBAN_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/logger'

// import IconButton from '@/widgets/Buttons/IconButton'

import Full from './Full'
import Simple from './Simple'

/* eslint-disable-next-line */
const log = buildLog('w:KanbanItem:index')

type TProps = {
  layout: TKanbanLayout
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ layout, article }) => {
  return layout === KANBAN_LAYOUT.FULL ? <Full article={article} /> : <Simple article={article} />
}

export default memo(KanbanItem)
