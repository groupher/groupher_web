import { FC } from 'react'

import type { TBannerBroadcastSettings, TTouched } from '../spec'

import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editor'

import { Wrapper, InnerWrapper, EnableDesc } from '../styles/banner_broadcast'
import { bannerBroadcastOnSave, bannerBroadcastOnCancel, bannerBroadcastToggle } from '../logic'

type TProps = {
  settings: TBannerBroadcastSettings
  touched: TTouched
}

const BannerBroadcast: FC<TProps> = ({ settings, touched }) => {
  const { saving, bannerBroadcastEnable } = settings

  return (
    <Wrapper>
      <InnerWrapper>
        <Templates settings={settings} />
        <br />
        <SectionLabel
          title="开启横幅广播"
          desc={<EnableDesc>开启后，本社区内的所有页面顶部将展示广播信息</EnableDesc>}
          addon={<ToggleSwitch checked={bannerBroadcastEnable} onChange={bannerBroadcastToggle} />}
        />
        <br />
        <Editor settings={settings} />

        <SavingBar
          isTouched={touched.bannerBroadcast}
          onCancel={bannerBroadcastOnCancel}
          onConfirm={bannerBroadcastOnSave}
          loading={saving}
          top={50}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

export default BannerBroadcast
