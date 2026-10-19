import { MENU_VIEW } from '../../../constant'
import ThreadMenuFrame from '../Frame'
import type { TThreadMenuProps } from '../spec'
import { KANBAN_MENU_CONFIG } from './constant'

export default function KanbanMenu(props: TThreadMenuProps) {
  return <ThreadMenuFrame {...props} config={KANBAN_MENU_CONFIG} view={MENU_VIEW.KANBAN} />
}
