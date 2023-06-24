import { FC, memo } from 'react'
import Router from 'next/router'

import type { TPostLayout } from '@/spec'
import { DASHBOARD_SEO_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useCurCommunity from '@/hooks/useCurCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TSEOSettings, TTouched } from '../spec'
import { SEO_TABS, SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'
import Portal from '../Portal'
import OpenGraph from './OpenGraph'
import TwitterGraph from './TwitterGraph'

import { Wrapper, SavingWrapper, Banner, TabsWrapper } from '../styles/basic_info'
import { edit } from '../logic'

type TProps = {
  testid?: TPostLayout
  settings: TSEOSettings
  touched: TTouched
}

const BasicInfo: FC<TProps> = ({ testid = 'basic-info', settings, touched }) => {
  const curCommunity = useCurCommunity()
  const { seoTab, saving } = settings

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
                  ? `/${curCommunity.raw}/dashboard/seo`
                  : `/${curCommunity.raw}/dashboard/seo/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {seoTab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE && <OpenGraph settings={settings} />}
      {seoTab === DASHBOARD_SEO_ROUTE.TWITTER && <TwitterGraph settings={settings} />}

      <SavingWrapper>
        <SavingBar field={SETTING_FIELD.SEO} isTouched={touched.seo} loading={saving} top={10} />
      </SavingWrapper>
    </Wrapper>
  )
}

export default memo(BasicInfo)
