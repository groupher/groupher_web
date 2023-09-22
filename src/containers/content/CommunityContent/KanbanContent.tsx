/*
 * CommunityContent
 */

import { FC } from 'react'

import { bond } from '@/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'
import useBannerLayout from '@/hooks/useBannerLayout'
import useMetric from '@/hooks/useMetric'

import KanbanThread from '@/containers//thread/KanbanThread'
import CommunityDigest from '@/widgets/CommunityDigest'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, InnerWrapper, SidebarWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

type TProps = {
  communityContent?: TStore
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const CommunityContentContainer: FC<TProps> = ({ communityContent: store }) => {
  useInit(store)
  const bannerLayout = useBannerLayout()
  const metric = useMetric()

  const LayoutWrapper = bannerLayout === BANNER_LAYOUT.SIDEBAR ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="kanban-thread-content">
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

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
