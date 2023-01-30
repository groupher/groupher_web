import { FC } from 'react'

import ColorSelector from '@/widgets/ColorSelector'

import type { TBroadcastSettings } from '../../spec'
import {
  Wrapper,
  Item,
  Label,
  BgLabel,
  TheColor,
  Inputer,
} from '../../styles/broadcast/editor/global'
import { edit } from '../../logic'

type TProps = {
  settings: TBroadcastSettings
}

const GlobalEditor: FC<TProps> = ({ settings }) => {
  const { broadcastBg } = settings

  return (
    <Wrapper>
      <Item>
        <Label>背景色</Label>
        <BgLabel bg={broadcastBg}>
          <ColorSelector
            activeColor={broadcastBg}
            onChange={(color) => edit(color, 'broadcastBg')}
            placement="right"
            offset={[-1, 15]}
          >
            <TheColor color={broadcastBg} />
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

export default GlobalEditor
