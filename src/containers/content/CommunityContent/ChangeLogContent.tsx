/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { bond } from '@/utils/mobx'
import { BANNER_LAYOUT } from '@/constant/layout'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import ChangelogThread from '@/containers/thread/ChangelogThread'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, SidebarWrapper, InnerWrapper, ContentWrapper, MobileCardsWrapper } from './styles'

type TProps = {
  communityContent?: TStore
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const CommunityContentContainer: FC<TProps> = ({ communityContent: store }) => {
  useInit(store)

  const { globalLayout } = store
  const { isMobile } = useMobileDetect()
  const LayoutWrapper = globalLayout.banner === BANNER_LAYOUT.SIDEBAR ? SidebarWrapper : Wrapper

  return (
    <LayoutWrapper testid="changelog-thread-content">
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <ChangelogThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper>
          <ContentWrapper>
            <ChangelogThread isSidebarLayout={globalLayout.banner === BANNER_LAYOUT.SIDEBAR} />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </LayoutWrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
