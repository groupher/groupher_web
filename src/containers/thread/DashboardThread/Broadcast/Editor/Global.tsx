import { FC } from 'react'

import ColorSelector from '@/widgets/ColorSelector'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import SectionLabel from '../../SectionLabel'
import GlobalTemplate from '../Templates/Global'
import SavingBar from '../../SavingBar'

import type { TBroadcastSettings, TTouched } from '../../spec'
import {
  Wrapper,
  Item,
  Label,
  BgLabel,
  TheColor,
  Inputer,
  EnableDesc,
} from '../../styles/broadcast/editor/global'
import { edit, broadcastOnSave, broadcastOnCancel } from '../../logic'

type TProps = {
  settings: TBroadcastSettings
  touched: TTouched
}

const GlobalEditor: FC<TProps> = ({ settings, touched }) => {
  const { saving, broadcastBg, broadcastEnable } = settings

  return (
    <Wrapper>
      <SectionLabel
        title="开启横幅广播"
        desc={<EnableDesc>开启后，本社区内的所有页面顶部将展示广播信息</EnableDesc>}
        addon={
          <ToggleSwitch checked={broadcastEnable} onChange={(v) => edit(v, 'broadcastEnable')} />
        }
      />
      <br />

      <GlobalTemplate settings={settings} />
      <br />

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

      <SavingBar
        isTouched={touched.broadcast}
        onCancel={broadcastOnCancel}
        onConfirm={broadcastOnSave}
        loading={saving}
        top={50}
      />
    </Wrapper>
  )
}

export default GlobalEditor