/*
 *
 * KanbanItem
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'
import { buildLog } from '@/logger'

// import IconButton from '@/widgets/Buttons/IconButton'

import Simple from './Simple'

const _log = buildLog('w:KanbanItem:index')

type TProps = {
  article: TArticle
}

const KanbanItem: FC<TProps> = ({ article }) => {
  return <Simple article={article} />
}

export default observer(KanbanItem)
