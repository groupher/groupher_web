import { FC, memo } from 'react'
import Router from 'next/router'

import type { TPostLayout } from '@/spec'
import { DASHBOARD_BASEINFO_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useCurCommunity from '@/hooks/useCurCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import { BASEINFO_TABS } from '../constant'
import type { TBaseInfoSettings, TTouched } from '../spec'

import Portal from '../Portal'

import BaseInfo from './BaseInfo'
import SocialInfo from './SocialInfo'
import OtherInfo from './OtherInfo'

import { Wrapper, Banner, TabsWrapper } from '../styles/basic_info'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
  touched: TTouched
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings, touched }) => {
  const curCommunity = useCurCommunity()

  const { baseInfoTab } = settings

  return (
    <Wrapper>
      <Portal title="社区信息" desc="社区基本信息，关于页面主要信息等。" withDivider={false} />

      <Banner>
        <TabsWrapper>
          <Tabs
            items={BASEINFO_TABS}
            activeKey={baseInfoTab}
            bottomSpace={4}
            onChange={(tab) => {
              edit(tab, 'baseInfoTab')
              const targetPath =
                tab === DASHBOARD_BASEINFO_ROUTE.BASIC
                  ? `/${curCommunity.raw}/dashboard/info`
                  : `/${curCommunity.raw}/dashboard/info/${tab}`

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
      {baseInfoTab === DASHBOARD_BASEINFO_ROUTE.OTHER && <OtherInfo settings={settings} />}
    </Wrapper>
  )
}

export default memo(BasicInfo)
