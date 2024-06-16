import { useRouter } from 'next/navigation'

import { DASHBOARD_BROADCAST_ROUTE } from '@/const/route'
import VIEW from '@/const/view'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import { BROADCAST_TABS } from '../constant'

import Portal from '../Portal'
import Editor from './Editor'

import useBroadcast from '../logic/useBroadcast'
import { Wrapper, Banner, TabsWrapper, InnerWrapper } from '../styles/broadcast'

export default () => {
  const router = useRouter()
  const curCommunity = useViewingCommunity()
  const { broadcastTab, edit } = useBroadcast()

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

              router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      <InnerWrapper>
        <Editor />
      </InnerWrapper>
    </Wrapper>
  )
}
