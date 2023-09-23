/*
 * PublishButton
 */
import { memo, FC, useState } from 'react'

import type { TPublishMode, TArticleCat, TSpace, TTooltipPlacement } from '@/spec'
import { PUBLISH_MODE } from '@/constant/publish'

import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import useViewingThread from '@/hooks/useViewingThread'

import Tooltip from '@/widgets/Tooltip'
import FullPanel from '@/widgets/CatSelector/FullPanel'

import { MORE_MENU } from './constant'

import PostLayout from './PostLayout'
import SidebarHeaderLayout from './SidebarHeaderLayout'

import { Wrapper, PubButton } from '../styles/publish_button'
import { getText } from './helper'

/* eslint-disable-next-line */
const log = buildLog('w:PublishButton:index')

type TProps = {
  text?: string
  mode?: TPublishMode
  onClick?: () => void
  onMenuSelect?: (cat: TArticleCat) => void
  menuLeft?: boolean
  offset?: [number, number]
  placement?: TTooltipPlacement
} & TSpace

const PublishButton: FC<TProps> = ({
  text = '',
  mode = PUBLISH_MODE.DEFAULT,
  placement = 'bottom',
  onClick = log,
  onMenuSelect = log,
  menuLeft = false,
  offset = [-5, 5],
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()
  const activeThread = useViewingThread()

  const [show, setShow] = useState(false)
  const _text = text || getText(activeThread)

  const menuOptions = MORE_MENU[mode]
  // const hasNoMenu = isEmpty(menuOptions)

  return (
    <Wrapper {...restProps}>
      <Tooltip
        placement={placement}
        trigger="click"
        onShow={() => setShow(true)}
        offset={offset as [number, number]}
        content={<>{show && <FullPanel onSelect={onMenuSelect} activeCat={null} />}</>}
      >
        <PubButton
          primaryColor={primaryColor}
          smaller={mode === PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER}
        >
          {mode === PUBLISH_MODE.DEFAULT && <PostLayout text={_text} />}
          {mode === PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER && <SidebarHeaderLayout text={text} />}
        </PubButton>
      </Tooltip>
    </Wrapper>
  )
}

export default memo(PublishButton)
