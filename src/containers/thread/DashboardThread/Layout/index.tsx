import { FC, memo } from 'react'

import { Divider } from '@/widgets/Common'
import VIEW from '@/constant/view'
import { DASHBOARD_LAYOUT_ROUTE } from '@/constant/route'

import Tabs from '@/widgets/Switcher/Tabs'

import { LAYOUT_TABS } from '../constant'
import Portal from '../Portal'
import AvatarLayout from './AvatarLayout'
import BrandLayout from './BrandLayout'
import BannerLayout from './BannerLayout'
import HelpLayout from './HelpLayout'
import PostLayout from './PostLayout'
import KanbanLayout from './KanbanLayout'
import TopbarLayout from './TopbarLayout'
import BannerNotifyLayout from './BannerNotifyLayout'

import type { TUiSettings, TTouched } from '../spec'
import { Wrapper, Banner, TabsWrapper } from '../styles/ui'

import { edit } from '../logic'

type TProps = {
  settings: TUiSettings
  touched: TTouched
}

const UI: FC<TProps> = ({ settings, touched }) => {
  const {
    layoutTab,
    brandLayout,
    avatarLayout,
    bannerLayout,
    helpLayout,
    topbarLayout,
    topbarBg,
    bannerNotifyLayout,
    bannerNotifyBg,
    postLayout,
    kanbanLayout,
    saving,
  } = settings

  return (
    <Wrapper>
      <Portal title="布局/样式" desc="社区板块自定义布局与全局样式。" withDivider={false} />

      <Banner>
        <TabsWrapper>
          <Tabs
            items={LAYOUT_TABS}
            activeKey={layoutTab}
            bottomSpace={4}
            onChange={(tab) => edit(tab, 'layoutTab')}
            view={VIEW.DESKTOP}
          />
        </TabsWrapper>
      </Banner>

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.GLOBAL && (
        <>
          <BannerLayout layout={bannerLayout} isTouched={touched.bannerLayout} saving={saving} />
          <Divider top={20} bottom={60} />
          <AvatarLayout layout={avatarLayout} isTouched={touched.avatarLayout} saving={saving} />
          <Divider top={20} bottom={60} />
          {/* <BrandLayout layout={brandLayout} isTouched={touched.brandLayout} saving={saving} />
          <Divider top={20} bottom={60} /> */}
          <TopbarLayout
            layout={topbarLayout}
            bg={topbarBg}
            isLayoutTouched={touched.topbarLayout}
            isBgTouched={touched.topbarBg}
            saving={saving}
          />

          <Divider top={20} bottom={60} />
          <BannerNotifyLayout
            layout={bannerNotifyLayout}
            bg={bannerNotifyBg}
            isLayoutTouched={touched.bannerNotifyLayout}
            isBgTouched={touched.bannerNotifyBg}
            saving={saving}
          />
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.POST && (
        <>
          <PostLayout layout={postLayout} isTouched={touched.postLayout} saving={saving} />
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.KANBAN && (
        <>
          <KanbanLayout layout={kanbanLayout} isTouched={touched.kanbanLayout} saving={saving} />
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.CHANGELOG && (
        <>
          <div>changelog todo</div>
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.HELP && (
        <>
          <HelpLayout layout={helpLayout} isTouched={touched.helpLayout} saving={saving} />
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.ABOUT && (
        <>
          <div>about todo</div>
        </>
      )}

      {/* <ChangelogLayout
        layout={changelogLayout}
        isTouched={touched.changelogLayout}
        saving={saving}
      />
      <Divider top={30} bottom={60} /> */}
    </Wrapper>
  )
}

export default memo(UI)
