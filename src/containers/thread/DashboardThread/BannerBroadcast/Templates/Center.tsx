import { FC } from 'react'

import { BANNER_BROADCAST_LAYOUT } from '@/constant/layout'
import { Space, SpaceGrow } from '@/widgets/Common'

import type { TBannerBroadcastSettings } from '../../spec'

import {
  Wrapper,
  Row,
  NotifyBar,
  NotifyDesc,
  NotifyTextBar,
  NotifyIcon,
  CrossIcon,
  ArrowIcon,
} from '../../styles/banner_broadcast/templates/default'
import { edit } from '../../logic'

type TProps = {
  settings: TBannerBroadcastSettings
  onSelect?: () => void | null
}

const Center: FC<TProps> = ({ settings, onSelect = null }) => {
  const { bannerBroadcastLayout, bannerBroadcastBg } = settings
  const $active = bannerBroadcastLayout === BANNER_BROADCAST_LAYOUT.CENTER

  return (
    <Wrapper
      $active={$active}
      onClick={() => {
        edit(BANNER_BROADCAST_LAYOUT.CENTER, 'bannerBroadcastLayout')
        onSelect?.()
      }}
    >
      <NotifyBar bg={bannerBroadcastBg} $active={$active} center>
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
