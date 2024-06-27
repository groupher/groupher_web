/*
 * PublishButton
 */
import { memo, type FC } from 'react'

import type { TPublishMode, TArticleCat, TSpace, TTooltipPlacement } from '~/spec'
import { PUBLISH_MODE } from '~/const/publish'

import usePrimaryColor from '~/hooks/usePrimaryColor'
import useViewingThread from '~/hooks/useViewingThread'

import { POST_CAT_MENU_ITEMS } from '~/const/menu'

import Menu from '~/widgets/Menu'

// import { MORE_MENU } from './constant'
import PostLayout from './PostLayout'
import SidebarHeaderLayout from './SidebarHeaderLayout'

import { Wrapper, PubButton } from '../styles/publish_button'
import { getText } from './helper'

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
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()
  const activeThread = useViewingThread()

  // const [show, setShow] = useState(false)
  const _text = text || getText(activeThread)

  // const menuOptions = MORE_MENU[mode]
  // const hasNoMenu = isEmpty(menuOptions)

  return (
    <Wrapper {...restProps}>
      <Menu
        offset={offset as [number, number]}
        placement={placement}
        items={POST_CAT_MENU_ITEMS}
        onSelect={(item) => onMenuSelect(item.key as TArticleCat)}
        // onShow={() => setMenuOpen(true)}
        // onHide={() => setMenuOpen(false)}
        // activeKey={activeCat}
        popWidth={195}
        withDesc
      >
        <PubButton $color={primaryColor} $smaller={mode === PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER}>
          {mode === PUBLISH_MODE.DEFAULT && <PostLayout text={_text} />}
          {mode === PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER && <SidebarHeaderLayout text={text} />}
        </PubButton>
      </Menu>
    </Wrapper>
  )
}

export default memo(PublishButton)
