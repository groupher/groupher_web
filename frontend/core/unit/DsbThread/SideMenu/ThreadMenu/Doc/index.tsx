import { MENU_VIEW } from '../../../constant'
import ThreadMenuFrame from '../Frame'
import type { TThreadMenuProps } from '../spec'
import { DOC_MENU_CONFIG } from './constant'

export default function DocMenu(props: TThreadMenuProps) {
  return <ThreadMenuFrame {...props} config={DOC_MENU_CONFIG} view={MENU_VIEW.DOC} />
}
