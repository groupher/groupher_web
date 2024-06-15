import { useRouter } from 'next/navigation'

import { DASHBOARD_SEO_ROUTE } from '@/const/route'
import VIEW from '@/const/view'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import Tabs from '@/widgets/Switcher/Tabs'

import { SEO_TABS, SETTING_FIELD } from '../constant'

import SavingBar from '../SavingBar'
import Portal from '../Portal'
import OpenGraph from './OpenGraph'
import TwitterGraph from './TwitterGraph'

import useSEO from '../logic/useSEO'
import { Wrapper, Banner, TabsWrapper } from '../styles/basic_info'

export default () => {
  const router = useRouter()
  const curCommunity = useViewingCommunity()
  const { seoTab, saving, getIsTouched, edit } = useSEO()

  const isTouched = getIsTouched()

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

              router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {seoTab === DASHBOARD_SEO_ROUTE.SEARCH_ENGINE && <OpenGraph />}
      {seoTab === DASHBOARD_SEO_ROUTE.TWITTER && <TwitterGraph />}

      <SavingBar
        field={SETTING_FIELD.SEO}
        isTouched={isTouched}
        loading={saving}
        width="305px"
        left={-5}
      />
    </Wrapper>
  )
}
