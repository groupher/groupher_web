import { FC, memo } from 'react'
import Router from 'next/router'

import { DASHBOARD_LAYOUT_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useCurCommunity from '@/hooks/useCurCommunity'
import { Divider } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'

import { LAYOUT_TABS } from '../constant'
import Portal from '../Portal'
import AvatarLayout from './AvatarLayout'
// import BrandLayout from './BrandLayout'
import BannerLayout from './BannerLayout'
import HelpLayout from './HelpLayout'
import ChangelogLayout from './ChangelogLayout'
import PostLayout from './PostLayout'
import KanbanLayout from './KanbanLayout'
import TopbarLayout from './TopbarLayout'

import PrimaryColor from './PrimaryColor'
import GlowEffect from './GlowEffect'
import Wallpaper from './Wallpaper'

import type { TUiSettings, TTouched } from '../spec'
import { Wrapper, Banner, TabsWrapper } from '../styles/layout'

import { edit } from '../logic'

type TProps = {
  settings: TUiSettings
  touched: TTouched
}

const UI: FC<TProps> = ({ settings, touched }) => {
  const curCommunity = useCurCommunity()

  const {
    layoutTab,
    // brandLayout,
    avatarLayout,
    bannerLayout,
    helpLayout,
    helpFaqLayout,
    topbarLayout,
    topbarBg,
    postLayout,
    kanbanLayout,
    kanbanBgColors,
    changelogLayout,

    // ui part
    primaryColor,
    wallpaperInfo,
    glowType,
    glowFixed,
    glowOpacity,
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
            onChange={(tab) => {
              edit(tab, 'layoutTab')
              const targetPath =
                tab === DASHBOARD_LAYOUT_ROUTE.GLOBAL
                  ? `/${curCommunity.raw}/dashboard/layout`
                  : `/${curCommunity.raw}/dashboard/layout/${tab}`

              Router.push(targetPath)
            }}
            view={VIEW.DESKTOP}
            noAnimation
          />
        </TabsWrapper>
      </Banner>

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.GLOBAL && (
        <>
          <PrimaryColor
            primaryColor={primaryColor}
            isTouched={touched.primaryColor}
            saving={saving}
          />
          <Divider top={20} bottom={60} />
          <BannerLayout layout={bannerLayout} isTouched={touched.bannerLayout} saving={saving} />
          <Divider top={20} bottom={60} />
          <Wallpaper wallpaperInfo={wallpaperInfo} />
          <Divider top={20} bottom={60} />
          <GlowEffect
            glowType={glowType}
            glowFixed={glowFixed}
            glowOpacity={glowOpacity}
            isTouched={touched.glowType}
            isGrowFixedTouched={touched.glowFixed}
            isGrowOpacityTouched={touched.glowOpacity}
            saving={saving}
          />
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
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.POST && (
        <PostLayout layout={postLayout} isTouched={touched.postLayout} saving={saving} />
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.KANBAN && (
        <KanbanLayout
          layout={kanbanLayout}
          isTouched={touched.kanbanLayout}
          isBgColorsTouched={touched.kanbanBgColors}
          kanbanBgColors={kanbanBgColors}
          saving={saving}
        />
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.CHANGELOG && (
        <ChangelogLayout
          layout={changelogLayout}
          isTouched={touched.changelogLayout}
          saving={saving}
        />
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.HELP && (
        <HelpLayout
          layout={helpLayout}
          faqLayout={helpFaqLayout}
          isTouched={touched.helpLayout}
          isFaqTouched={touched.helpFaqLayout}
          saving={saving}
        />
      )}
    </Wrapper>
  )
}

export default memo(UI)
