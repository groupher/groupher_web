import { FC } from 'react'

import { BROADCAST_LAYOUT } from '@/constant/layout'
import { Space, SpaceGrow } from '@/widgets/Common'

import type { TBroadcastSettings } from '../../../spec'

import {
  Wrapper,
  Row,
  NotifyBar,
  NotifyDesc,
  NotifyTextBar,
  NotifyIcon,
  CrossIcon,
  ArrowIcon,
} from '../../../styles/broadcast/templates/global/default'
import { edit } from '../../../logic'

type TProps = {
  settings: TBroadcastSettings
  onSelect?: () => void | null
}

const Center: FC<TProps> = ({ settings, onSelect = null }) => {
  const { broadcastLayout, broadcastBg } = settings
  const $active = broadcastLayout === BROADCAST_LAYOUT.CENTER

  return (
    <Wrapper
      $active={$active}
      onClick={() => {
        edit(BROADCAST_LAYOUT.CENTER, 'broadcastLayout')
        onSelect?.()
      }}
    >
      <NotifyBar bg={broadcastBg} $active={$active} center>
        <SpaceGrow />
        <Row>
          <NotifyIcon />
          <NotifyDesc>
            <NotifyTextBar long={180} thin />
          </NotifyDesc>
          <Space right={10} />
          <NotifyTextBar long={50} thin />
          <Space left={5} />
          <ArrowIcon />
        </Row>
        <SpaceGrow />
        <CrossIcon />
      </NotifyBar>
    </Wrapper>
  )
}

export default Center
