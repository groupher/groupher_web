import { FC } from 'react'

import { BANNER_BROADCAST_LAYOUT } from '@/constant/layout'
import { Space, SpaceGrow } from '@/widgets/Common'

import type { TBannerBroadcastSettings } from '../../spec'
import {
  Wrapper,
  NotifyBar,
  NotifyDesc,
  NotifySolidLink,
  NotifyTextBar,
  NotifyIcon,
  CrossIcon,
} from '../../styles/banner_broadcast/templates/default'
import { edit } from '../../logic'

type TProps = {
  settings: TBannerBroadcastSettings
  onSelect?: () => void | null
}

const Default: FC<TProps> = ({ settings, onSelect = null }) => {
  const { bannerBroadcastLayout, bannerBroadcastBg } = settings
  const $active = bannerBroadcastLayout === BANNER_BROADCAST_LAYOUT.DEFAULT

  return (
    <Wrapper
      $active={$active}
      onClick={() => {
        edit(BANNER_BROADCAST_LAYOUT.DEFAULT, 'bannerBroadcastLayout')
        onSelect?.()
      }}
    >
      <NotifyBar bg={bannerBroadcastBg} $active={$active}>
        <NotifyIcon />
        <NotifyDesc>
          <NotifyTextBar long={220} thin />
        </NotifyDesc>
        <SpaceGrow />
        <NotifySolidLink bg={bannerBroadcastBg}>
          <NotifyTextBar long={40} thin />
        </NotifySolidLink>
        <Space left={5} />
        <CrossIcon />
      </NotifyBar>
    </Wrapper>
  )
}

export default Default
