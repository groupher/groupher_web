import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BROADCAST_LAYOUT } from '@/const/layout'
import { Space, SpaceGrow } from '@/widgets/Common'

import useBroadcastInfo from '../../../hooks/useBroadcastInfo'
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
  onSelect?: () => void
}

const Default: FC<TProps> = ({ onSelect = null }) => {
  const { broadcastLayout, broadcastBg } = useBroadcastInfo()
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

export default observer(Default)
