import { FC } from 'react'
import Router from 'next/router'

import { DASHBOARD_BROADCAST_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import Tabs from '@/widgets/Switcher/Tabs'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import type { TBroadcastSettings, TTouched } from '../spec'
import { BROADCAST_TABS } from '../constant'

import Portal from '../Portal'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import Templates from './Templates'
import Editor from './Editor'

import { Wrapper, Banner, TabsWrapper, InnerWrapper, EnableDesc } from '../styles/broadcast'
import { edit, broadcastOnSave, broadcastOnCancel, broadcastToggle } from '../logic'

type TProps = {
  settings: TBroadcastSettings
  touched: TTouched
}

const Broadcast: FC<TProps> = ({ settings, touched }) => {
  const { saving, broadcastEnable, broadcastTab } = settings

  return (
    <Wrapper>
      <Banner>
        <Portal title="布局/样式" desc="社区板块自定义布局与全局样式。" withDivider={false} />

        <TabsWrapper>
          <Tabs
            items={BROADCAST_TABS}
            activeKey={broadcastTab}
            bottomSpace={4}
            onChange={(tab) => {
              edit(tab, 'broadcastTab')
              const targetPath =
                tab === DASHBOARD_BROADCAST_ROUTE.GLOBAL
                  ? '/home/dashboard/broadcast'
                  : `/home/dashboard/broadcast/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      <InnerWrapper>
        <Templates settings={settings} />
        <br />
        <SectionLabel
          title="开启横幅广播"
          desc={<EnableDesc>开启后，本社区内的所有页面顶部将展示广播信息</EnableDesc>}
          addon={<ToggleSwitch checked={broadcastEnable} onChange={broadcastToggle} />}
        />
        <br />

        <Editor settings={settings} tab={broadcastTab} />

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
