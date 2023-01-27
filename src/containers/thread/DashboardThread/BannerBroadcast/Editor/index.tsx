import { FC } from 'react'

import ColorSelector from '@/widgets/ColorSelector'

import type { TBannerBroadcastSettings } from '../../spec'
import { Wrapper, BgWrapper, BgLabel, TheColor } from '../../styles/banner_broadcast/editor'
import { edit } from '../../logic'

type TProps = {
  settings: TBannerBroadcastSettings
}

const Editor: FC<TProps> = ({ settings }) => {
  const { bannerBroadcastBg } = settings

  return (
    <Wrapper>
      <BgWrapper>
        <div>背景色:</div>
        <BgLabel bg={bannerBroadcastBg}>
          <ColorSelector
            activeColor={bannerBroadcastBg}
            onChange={(color) => edit(color, 'bannerBroadcastBg')}
            placement="right"
            offset={[-1, 15]}
          >
            <TheColor color={bannerBroadcastBg} />
          </ColorSelector>
        </BgLabel>
      </BgWrapper>
    </Wrapper>
  )
}

export default Editor
