import { FC, memo } from 'react'
import Router from 'next/router'

import type { TPostLayout } from '@/spec'
import { DASHBOARD_BASEINFO_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import Tabs from '@/widgets/Switcher/Tabs'

import { BASEINFO_TABS } from '../constant'
import type { TBaseInfoSettings } from '../spec'

import Portal from '../Portal'

import BaseInfoForm from './BaseInfoForm'
import SEOForm from './SEOForm'

import { Wrapper, Banner, TabsWrapper } from '../styles/basic_info'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TBaseInfoSettings
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
  const { baseInfoTab } = settings

  return (
    <Wrapper>
      <Portal
        title="社区信息"
        desc="社区基本信息，关于页面主要信息，SEO 信息等。"
        withDivider={false}
      />

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
                  ? '/home/dashboard/info'
                  : `/home/dashboard/info/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {baseInfoTab === DASHBOARD_BASEINFO_ROUTE.BASIC && <BaseInfoForm />}
      {baseInfoTab === DASHBOARD_BASEINFO_ROUTE.SEO && <SEOForm />}
    </Wrapper>
  )
}

export default memo(BasicInfo)
