import { DSB_POST_ROUTE } from '~/const/route'

import { MENU_VIEW } from '../../../constant'
import ThreadMenuFrame from '../Frame'
import type { TThreadMenuProps } from '../spec'
import { POST_MENU_CONFIG } from './constant'
import PostContentCount from './ContentCount'

export default function PostMenu(props: TThreadMenuProps) {
  return (
    <ThreadMenuFrame
      {...props}
      config={POST_MENU_CONFIG}
      endSlots={{ [DSB_POST_ROUTE.CONTENT]: <PostContentCount /> }}
      view={MENU_VIEW.POST}
    />
  )
}
