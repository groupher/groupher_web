/*
 *
 * KanbanItem
 *
 */

import { FC, memo } from 'react'

import type { TKanbanLayout } from '@/spec'
import { KANBAN_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/utils/logger'

// import IconButton from '@/widgets/Buttons/IconButton'

import Full from './Full'
import Simple from './Simple'

/* eslint-disable-next-line */
const log = buildLog('w:KanbanItem:index')

type TProps = {
  testid?: string
  layout: TKanbanLayout
}

const KanbanItem: FC<TProps> = ({ testid = 'gtd-item', layout }) => {
  return layout === KANBAN_LAYOUT.FULL ? <Full /> : <Simple />
}

export default memo(KanbanItem)
