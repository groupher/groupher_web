/*
 *
 * PublishButton
 *
 */

import { memo, FC, useState, Fragment } from 'react'
import dynamic from 'next/dynamic'
// import Router from 'next/router'
import { isEmpty } from 'ramda'

import type { TThread, TPublishMode, TArticleCat } from '@/spec'
import { PUBLISH_MODE } from '@/constant/publish'
import { HCN } from '@/constant/name'
import { THREAD } from '@/constant/thread'
import SVG from '@/constant/svg'

import Tooltip from '@/widgets/Tooltip'
import { buildLog } from '@/utils/logger'
// import { authWarn } from '@/utils/signal'
import useAccount from '@/hooks/useAccount'

import { MORE_MENU } from './constant'
import IconButton from '../IconButton'

import PostLayout from './PostLayout'

import { Wrapper, PubButton, MoreOption } from '../styles/publish_button'
import { getText } from './helper'

/* eslint-disable-next-line */
const log = buildLog('w:PublishButton:index')

const FullPanel = dynamic(() => import('@/widgets/CatSelector/FullPanel'))

type TProps = {
  thread?: TThread
  community?: string
  text?: string
  mode?: TPublishMode
  onClick?: () => void
  onMenuSelect?: (cat: TArticleCat) => void
}

const PublishButton: FC<TProps> = ({
  thread = THREAD.POST,
  community = HCN,
  text = getText(thread),
  mode = PUBLISH_MODE.DEFAULT,
  onClick = log,
  onMenuSelect = log,
}) => {
  const [show, setShow] = useState(false)
  const accountInfo = useAccount()

  const menuOptions = MORE_MENU[mode]
  const hasNoMenu = isEmpty(menuOptions)

  const offset = [5, 15]

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
          <Tooltip
            placement="bottom-end"
            trigger="click"
            onShow={() => setShow(true)}
            offset={offset as [number, number]}
            content={
              <Fragment>{show && <FullPanel onSelect={onMenuSelect} activeCat={null} />}</Fragment>
            }
          >
            <IconButton icon={SVG.MOREL} />
          </Tooltip>
        </MoreOption>
      )}
    </Wrapper>
  )
}

export default memo(PublishButton)
