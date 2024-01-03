import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { DASHBOARD_LAYOUT_ROUTE } from '@/constant/route'
import VIEW from '@/constant/view'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { SexyDivider as Divider } from '@/widgets/Common'
import Tabs from '@/widgets/Switcher/Tabs'

import { LAYOUT_TABS } from '../constant'
import Portal from '../Portal'
import AvatarLayout from './AvatarLayout'
import TagLayout from './TagLayout'
// import BrandLayout from './BrandLayout'
import BannerLayout from './BannerLayout'
import DocLayout from './DocLayout'
import ChangelogLayout from './ChangelogLayout'
import PostLayout from './PostLayout'
import KanbanLayout from './KanbanLayout'
import TopbarLayout from './TopbarLayout'

import PrimaryColor from './PrimaryColor'
import GlowLight from './GlowLight'
import GossBlur from './GossBlur'
import Wallpaper from './Wallpaper'

import type { TUiSettings, TTouched } from '../spec'
import { Wrapper, Banner, TabsWrapper } from '../styles/layout'

import { edit } from '../logic'

type TProps = {
  settings: TUiSettings
  touched: TTouched
}

const UI: FC<TProps> = ({ settings, touched }) => {
  const curCommunity = useViewingCommunity()
  const router = useRouter()

  const {
    layoutTab,
    // brandLayout,
    avatarLayout,
    tagLayout,
    bannerLayout,
    docLayout,
    docFaqLayout,
    topbarLayout,
    topbarBg,
    postLayout,
    kanbanLayout,
    kanbanCardLayout,
    kanbanBgColors,
    changelogLayout,

    // ui part
    primaryColor,
    wallpaperInfo,
    gossBlur,
    saving,
  } = settings

  return (
    <Wrapper>
      <Portal title="布局与样式" desc="社区板块自定义布局与全局样式。" withDivider={false} />
      <Banner>
        <TabsWrapper>
          <Tabs
            items={LAYOUT_TABS}
            activeKey={layoutTab}
            onChange={(tab) => {
              edit(tab, 'layoutTab')
              const targetPath =
                tab === DASHBOARD_LAYOUT_ROUTE.GLOBAL
                  ? `/${curCommunity.slug}/dashboard/layout`
                  : `/${curCommunity.slug}/dashboard/layout/${tab}`

              router.push(targetPath)
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
          <Wallpaper wallpaperInfo={wallpaperInfo} gossBlur={gossBlur} />
          <Divider top={20} bottom={60} />

          <GossBlur />

          <Divider top={20} bottom={60} />
          <GlowLight />
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.POST && (
        <PostLayout layout={postLayout} isTouched={touched.postLayout} saving={saving} />
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.KANBAN && (
        <KanbanLayout
          layout={kanbanLayout}
          cardLayout={kanbanCardLayout}
          isTouched={touched.kanbanLayout}
          isCardTouched={touched.kanbanCardLayout}
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

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.DOC && (
        <DocLayout
          layout={docLayout}
          faqLayout={docFaqLayout}
          isTouched={touched.docLayout}
          isFaqTouched={touched.docFaqLayout}
          saving={saving}
        />
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.OTHER && (
        <>
          <AvatarLayout layout={avatarLayout} isTouched={touched.avatarLayout} saving={saving} />
          <Divider top={20} bottom={60} />
          <TagLayout layout={tagLayout} isTouched={touched.tagLayout} saving={saving} />
          <Divider top={20} bottom={60} />
          <TopbarLayout
            layout={topbarLayout}
            bg={topbarBg}
            isLayoutTouched={touched.topbarLayout}
            isBgTouched={touched.topbarBg}
            saving={saving}
          />
        </>
      )}
    </Wrapper>
  )
}

export default observer(UI)
