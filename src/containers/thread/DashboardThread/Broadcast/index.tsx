import { FC } from 'react'

import type { TBroadcastSettings, TTouched } from '../spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editor'

import { Wrapper, InnerWrapper, EnableDesc } from '../styles/broadcast'
import { broadcastOnSave, broadcastOnCancel, broadcastToggle } from '../logic'

type TProps = {
  settings: TBroadcastSettings
  touched: TTouched
}

const Broadcast: FC<TProps> = ({ settings, touched }) => {
  const { saving, broadcastEnable } = settings

  return (
    <Wrapper>
      <InnerWrapper>
        <Templates settings={settings} />
        <br />
        <SectionLabel
          title="开启横幅广播"
          desc={<EnableDesc>开启后，本社区内的所有页面顶部将展示广播信息</EnableDesc>}
          addon={<ToggleSwitch checked={broadcastEnable} onChange={broadcastToggle} />}
        />
        <br />
        <Editor settings={settings} />

        <SavingBar
          isTouched={touched.broadcast}
          onCancel={broadcastOnCancel}
          onConfirm={broadcastOnSave}
          loading={saving}
          top={50}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default Broadcast
