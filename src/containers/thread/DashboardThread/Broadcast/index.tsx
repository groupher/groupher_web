import { FC } from 'react'
import Router from 'next/router'

import { DASHBOARD_BROADCAST_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useCurCommunity from '@/hooks/useCurCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TBroadcastSettings, TTouched } from '../spec'
import { BROADCAST_TABS } from '../constant'

import Portal from '../Portal'
import Editor from './Editor'

import { Wrapper, Banner, TabsWrapper, InnerWrapper } from '../styles/broadcast'
import { edit } from '../logic'

type TProps = {
  settings: TBroadcastSettings
  touched: TTouched
}

const Broadcast: FC<TProps> = ({ settings, touched }) => {
  const curCommunity = useCurCommunity()

  const { broadcastTab } = settings

  return (
    <Wrapper>
      <Banner>
        <Portal title="布局/样式" desc="社区板块自定义布局与全局样式。" withDivider={false} />

        <TabsWrapper>
          <Tabs
            items={BROADCAST_TABS}
            activeKey={broadcastTab}
            onChange={(tab) => {
              edit(tab, 'broadcastTab')
              const targetPath =
                tab === DASHBOARD_BROADCAST_ROUTE.GLOBAL
                  ? `/${curCommunity.slug}/dashboard/broadcast`
                  : `/${curCommunity.slug}/dashboard/broadcast/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      <InnerWrapper>
        <Editor settings={settings} touched={touched} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default Broadcast
