import { MENU_VIEW } from '../../../constant'
import ThreadMenuFrame from '../Frame'
import type { TThreadMenuProps } from '../spec'
import { CHANGELOG_MENU_CONFIG } from './constant'

export default function ChangelogMenu(props: TThreadMenuProps) {
  return <ThreadMenuFrame {...props} config={CHANGELOG_MENU_CONFIG} view={MENU_VIEW.CHANGELOG} />
}
