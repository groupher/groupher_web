/*
 *
 * PublishButton
 *
 */

import { memo, FC } from 'react'
// import Router from 'next/router'
import { isEmpty } from 'ramda'

import type { TThread, TPublishMode } from '@/spec'
import { THREAD, HCN, SVG, PUBLISH_MODE } from '@/constant'

import { buildLog } from '@/utils/logger'
// import { authWarn } from '@/utils/helper'
import useAccount from '@/hooks/useAccount'

import { MORE_MENU } from './constant'
import IconButton from '../IconButton'
import MenuButton from '../MenuButton'

import PostLayout from './PostLayout'

import { Wrapper, PubButton, MoreOption } from '../styles/publish_button'
import { getTargetPage, getText } from './helper'

/* eslint-disable-next-line */
const log = buildLog('w:PublishButton:index')

type TProps = {
  thread?: TThread
  community?: string
  text?: string
  mode?: TPublishMode
  onClick?: () => void
}

const PublishButton: FC<TProps> = ({
  thread = THREAD.POST,
  community = HCN,
  text = getText(thread),
  mode = PUBLISH_MODE.DEFAULT,
  onClick = log,
}) => {
  const accountInfo = useAccount()

  const menuOptions = MORE_MENU[mode]
  const hasNoMenu = isEmpty(menuOptions)

  return (
    <Wrapper>
      <PubButton
        onClick={() => {
          onClick()
          // if (!accountInfo) return authWarn()
          // const url = getTargetPage(community, thread)
          // Router.push(url)
        }}
      >
        <PostLayout text={text} />
      </PubButton>
      {!hasNoMenu && (
        <MoreOption>
          <MenuButton
            placement="bottom-end"
            options={menuOptions}
            offset={[-5, 14]}
          >
            <IconButton icon={SVG.MOREL} />
          </MenuButton>
        </MoreOption>
      )}
    </Wrapper>
  )
}

export default memo(PublishButton)
