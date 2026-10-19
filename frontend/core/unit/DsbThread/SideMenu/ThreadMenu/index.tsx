import type { ComponentType } from 'react'

import { MENU_VIEW } from '../../constant'
import ChangelogMenu from './Changelog'
import DocMenu from './Doc'
import KanbanMenu from './Kanban'
import PostMenu from './Post'
import { isThreadMenuView } from './registry'
import type { TThreadMenuProps, TThreadMenuView } from './spec'

const THREAD_MENU_COMPONENT = {
  [MENU_VIEW.DOC]: DocMenu,
  [MENU_VIEW.POST]: PostMenu,
  [MENU_VIEW.KANBAN]: KanbanMenu,
  [MENU_VIEW.CHANGELOG]: ChangelogMenu,
} satisfies Record<TThreadMenuView, ComponentType<TThreadMenuProps>>

type TProps = TThreadMenuProps & {
  view: string
}

export default function ThreadMenu({ view, ...props }: TProps) {
  if (!isThreadMenuView(view)) return null

  const Menu = THREAD_MENU_COMPONENT[view]

  return <Menu {...props} />
}
