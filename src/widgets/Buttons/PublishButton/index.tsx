/*
 * PublishButton
 */
import { memo, type FC } from 'react'

import type { TPublishMode, TArticleCat, TSpace, TTooltipPlacement } from '~/spec'

import { PUBLISH_MODE } from '~/const/publish'
import { POST_CAT_MENU_ITEMS } from '~/const/menu'

import useViewingThread from '~/hooks/useViewingThread'
import Menu from '~/widgets/Menu'

// import { MORE_MENU } from './constant'
import PostLayout from './PostLayout'
import SidebarHeaderLayout from './SidebarHeaderLayout'
import Button from '../Button'

import { getText } from './helper'
import useSalon from '../salon/publish_button'

type TProps = {
  text?: string
  mode?: TPublishMode
  onMenuSelect?: (cat: TArticleCat) => void
  menuLeft?: boolean
  offset?: [number, number]
  placement?: TTooltipPlacement
} & TSpace

const PublishButton: FC<TProps> = ({
  text = '',
  mode = PUBLISH_MODE.DEFAULT,
  placement = 'bottom',
  onMenuSelect = console.log,
  menuLeft = false,
  offset = [-5, 5],
  ...spacing
}) => {
  const s = useSalon({ ...spacing })
  const activeThread = useViewingThread()

  const _text = text || getText(activeThread)

  return (
    <div className={s.wrapper}>
      <Menu
        offset={offset as [number, number]}
        placement={placement}
        items={POST_CAT_MENU_ITEMS}
        onSelect={(item) => onMenuSelect(item.key as TArticleCat)}
        popWidth={48}
        withDesc
      >
        <div className={s.pubBtn}>
          <Button>
            {mode === PUBLISH_MODE.DEFAULT && <PostLayout text={_text} />}
            {mode === PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER && <SidebarHeaderLayout text={text} />}
          </Button>
        </div>
      </Menu>
    </div>
  )
}

export default memo(PublishButton)
