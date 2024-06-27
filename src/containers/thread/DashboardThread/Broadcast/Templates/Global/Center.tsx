import type { FC } from 'react'

import { BROADCAST_LAYOUT } from '~/const/layout'
import { Space, SpaceGrow } from '~/widgets/Common'

import useBroadcast from '../../../logic/useBroadcast'
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

type TProps = {
  onSelect?: () => void
}

const Center: FC<TProps> = ({ onSelect = null }) => {
  const { broadcastLayout, broadcastBg, edit } = useBroadcast()
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
