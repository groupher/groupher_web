import { FC } from 'react'
import { observer } from 'mobx-react'
import Router from 'next/router'

import { DASHBOARD_SEO_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TSEOSettings, TTouched } from '../spec'
import { SEO_TABS, SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'
import Portal from '../Portal'
import OpenGraph from './OpenGraph'
import TwitterGraph from './TwitterGraph'

import { Wrapper, Banner, TabsWrapper } from '../styles/basic_info'
import { edit } from '../logic'

type TProps = {
  settings: TSEOSettings
  touched: TTouched
}

const BasicInfo: FC<TProps> = ({ settings, touched }) => {
  const curCommunity = useViewingCommunity()
  const { seoTab, saving } = settings

  return (
    <Wrapper>
      <Portal title="SEO" desc="搜索引擎及社交媒体展示优化。" withDivider={false} />

      <Banner>
        <TabsWrapper>
          <Tabs
            items={SEO_TABS}
            activeKey={seoTab}
            onChange={(tab) => {
              edit(tab, 'seoTab')
              const targetPath =
                tab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE
                  ? `/${curCommunity.slug}/dashboard/seo`
                  : `/${curCommunity.slug}/dashboard/seo/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {seoTab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE && <OpenGraph settings={settings} />}
      {seoTab === DASHBOARD_SEO_ROUTE.TWITTER && <TwitterGraph settings={settings} />}

      <SavingBar
        field={SETTING_FIELD.SEO}
        isTouched={touched.seo}
        loading={saving}
        width="305px"
        left={-5}
      />
    </Wrapper>
  )
}

export default observer(BasicInfo)
