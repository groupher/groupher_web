import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Router from 'next/router'

import { DASHBOARD_BASEINFO_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import { BASEINFO_TABS } from '../constant'
import type { TBaseInfoSettings, TTouched } from '../spec'

import Portal from '../Portal'

import BaseInfo from './BaseInfo'
import SocialInfo from './SocialInfo'
import OtherInfo from './OtherInfo'

import { Wrapper, Banner, TabsWrapper } from '../styles/basic_info'
import { edit, loadBaseInfo } from '../logic'

type TProps = {
  settings: TBaseInfoSettings
  touched: TTouched
}

const BasicInfo: FC<TProps> = ({ settings, touched }) => {
  const curCommunity = useViewingCommunity()
  const { baseInfoTab } = settings

  useEffect(() => {
    setTimeout(() => loadBaseInfo())
  }, [])

  return (
    <Wrapper>
      <Portal
        title="社区信息"
        desc="社区基本信息，社交媒体，关于页面主要信息等。"
        withDivider={false}
      />

      <Banner>
        <TabsWrapper>
          <Tabs
            items={BASEINFO_TABS}
            activeKey={baseInfoTab}
            onChange={(tab) => {
              edit(tab, 'baseInfoTab')
              const targetPath =
                tab === DASHBOARD_BASEINFO_ROUTE.BASIC
                  ? `/${curCommunity.slug}/dashboard/info`
                  : `/${curCommunity.slug}/dashboard/info/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {baseInfoTab === DASHBOARD_BASEINFO_ROUTE.BASIC && (
        <BaseInfo settings={settings} touched={touched} />
      )}
      {baseInfoTab === DASHBOARD_BASEINFO_ROUTE.SOCIAL && (
        <SocialInfo settings={settings} touched={touched} />
      )}
      {baseInfoTab === DASHBOARD_BASEINFO_ROUTE.OTHER && (
        <OtherInfo settings={settings} touched={touched} />
      )}
    </Wrapper>
  )
}

export default observer(BasicInfo)
