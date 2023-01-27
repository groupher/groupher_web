import { FC } from 'react'

import ColorSelector from '@/widgets/ColorSelector'

import type { TBannerBroadcastSettings } from '../../spec'
import {
  Wrapper,
  Item,
  Label,
  BgLabel,
  TheColor,
  Inputer,
} from '../../styles/banner_broadcast/editor'
import { edit } from '../../logic'

type TProps = {
  settings: TBannerBroadcastSettings
}

const Editor: FC<TProps> = ({ settings }) => {
  const { bannerBroadcastBg } = settings

  return (
    <Wrapper>
      <Item>
        <Label>背景色</Label>
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
      </Item>

      <Item>
        <Label>广播内容</Label>
        <Inputer />
      </Item>

      <Item>
        <Label>链接地址</Label>
        <Inputer />
      </Item>
    </Wrapper>
  )
}

export default Editor
