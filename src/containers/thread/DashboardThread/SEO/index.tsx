import { FC, memo } from 'react'
import Router from 'next/router'

import type { TPostLayout } from '@/spec'
import { DASHBOARD_SEO_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import Tabs from '@/widgets/Switcher/Tabs'

import type { TSEOSettings } from '../spec'
import { SEO_TABS } from '../constant'

import Portal from '../Portal'
import OpenGraph from './OpenGraph'
import TwitterGraph from './TwitterGraph'

import { Wrapper, Banner, TabsWrapper } from '../styles/basic_info'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TSEOSettings
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings }) => {
  const { seoTab } = settings

  return (
    <Wrapper>
      <Portal title="SEO" desc="搜索引擎及社交媒体展示优化。" withDivider={false} />

      <Banner>
        <TabsWrapper>
          <Tabs
            items={SEO_TABS}
            activeKey={seoTab}
            bottomSpace={4}
            onChange={(tab) => {
              edit(tab, 'seoTab')
              const targetPath =
                tab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE
                  ? '/home/dashboard/seo'
                  : `/home/dashboard/seo/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {seoTab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE && <OpenGraph settings={settings} />}
      {seoTab === DASHBOARD_SEO_ROUTE.TWITTER && <TwitterGraph settings={settings} />}
    </Wrapper>
  )
}

export default memo(BasicInfo)
