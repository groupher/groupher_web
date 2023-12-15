import { FC } from 'react'

import { BROADCAST_LAYOUT } from '@/constant/layout'
import { Space, SpaceGrow } from '@/widgets/Common'

import type { TBroadcastSettings } from '../../../spec'
import {
  Wrapper,
  NotifyBar,
  NotifyDesc,
  NotifySolidLink,
  NotifyTextBar,
  NotifyIcon,
  CrossIcon,
} from '../../../styles/broadcast/templates/global/default'
import { edit } from '../../../logic'

type TProps = {
  settings: TBroadcastSettings
  onSelect?: () => void
}

const Default: FC<TProps> = ({ settings, onSelect = null }) => {
  const { broadcastLayout, broadcastBg } = settings
  const $active = broadcastLayout === BROADCAST_LAYOUT.DEFAULT

  return (
    <Wrapper
      $active={$active}
      onClick={() => {
        edit(BROADCAST_LAYOUT.DEFAULT, 'broadcastLayout')
        onSelect?.()
      }}
    >
      <NotifyBar bg={broadcastBg} $active={$active}>
        <NotifyIcon />
        <NotifyDesc>
          <NotifyTextBar long={220} thin />
        </NotifyDesc>
        <SpaceGrow />
        <NotifySolidLink bg={broadcastBg}>
          <NotifyTextBar long={40} thin />
        </NotifySolidLink>
        <Space left={5} />
        <CrossIcon />
      </NotifyBar>
    </Wrapper>
  )
}

export default Default
