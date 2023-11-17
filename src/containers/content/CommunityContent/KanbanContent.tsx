/*
 * CommunityContent
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BANNER_LAYOUT } from '@/constant/layout'
import useBannerLayout from '@/hooks/useBannerLayout'
import useMetric from '@/hooks/useMetric'

import KanbanThread from '@/containers//thread/KanbanThread'
import CommunityDigest from '@/widgets/CommunityDigest'

import { useStore } from './store'
import { useInit } from './logic'

import { Wrapper, InnerWrapper, SidebarWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

/**
 * only for AboutThread, but link to the common communityContent store
 */
const KanbanContent: FC = () => {
  const store = useStore()
  useInit(store)
  const bannerLayout = useBannerLayout()
  const metric = useMetric()

  const LayoutWrapper = bannerLayout === BANNER_LAYOUT.SIDEBAR ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper $testid="kanban-thread-content" metric={metric}>
      <CommunityDigest />
      <MobileCardsWrapper>
        <ContentWrapper>
          <KanbanThread />
        </ContentWrapper>
      </MobileCardsWrapper>
      <InnerWrapper metric={metric}>
        <ContentWrapper>
          <KanbanThread isSidebarLayout={bannerLayout === BANNER_LAYOUT.SIDEBAR} />
        </ContentWrapper>
      </InnerWrapper>
    </LayoutWrapper>
  )
}

export default observer(KanbanContent)
