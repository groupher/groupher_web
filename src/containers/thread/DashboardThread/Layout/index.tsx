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
import BrandLayout from './BrandLayout'
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

import useTabInfo from '../hooks/useTabInfo'
import { Wrapper, Banner, TabsWrapper } from '../styles/layout'
import { edit } from '../logic'

const UI: FC = () => {
  const curCommunity = useViewingCommunity()
  const router = useRouter()

  const { layoutTab } = useTabInfo()

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
          <PrimaryColor />
          <Divider top={20} bottom={60} />
          <BrandLayout />
          <Divider top={20} bottom={60} />
          <BannerLayout />
          <Divider top={20} bottom={60} />
          <Wallpaper />
          <Divider top={20} bottom={60} />
          <GossBlur />
          <Divider top={20} bottom={60} />
          <GlowLight />
        </>
      )}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.POST && <PostLayout />}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.KANBAN && <KanbanLayout />}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.CHANGELOG && <ChangelogLayout />}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.DOC && <DocLayout />}

      {layoutTab === DASHBOARD_LAYOUT_ROUTE.OTHER && (
        <>
          <AvatarLayout />
          <Divider top={20} bottom={60} />
          <TagLayout />
          <Divider top={20} bottom={60} />
          <TopbarLayout />
        </>
      )}
    </Wrapper>
  )
}

export default observer(UI)
