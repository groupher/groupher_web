import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BROADCAST_LAYOUT } from '@/const/layout'
import { Space, SpaceGrow } from '@/widgets/Common'

import useBroadcastInfo from '../../../hooks/useBroadcastInfo'
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
  onSelect?: () => void
}

const Center: FC<TProps> = ({ onSelect = null }) => {
  const { broadcastLayout, broadcastBg } = useBroadcastInfo()
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

export default observer(Center)
