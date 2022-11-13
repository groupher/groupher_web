/*
 * CommunityContent
 */

import { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { bond } from '@/utils/mobx'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import ArticlesThread from '@/containers//thread/ArticlesThread'

import type { TStore } from './store'
import { useInit } from './logic'

import {
  Wrapper,
  InnerWrapper,
  ContentWrapper,
  MobileCardsWrapper,
} from './styles'

type TProps = {
  communityContent?: TStore
}

/**
 * only for AboutThread, but link to the common communityContent store
 */
const CommunityContentContainer: FC<TProps> = ({ communityContent: store }) => {
  useInit(store)

  const { isMobile } = useMobileDetect()

  return (
    <Wrapper testid="post-thread-content">
      <CommunityDigest />
      {isMobile ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <ArticlesThread />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper>
          <ContentWrapper>
            <ArticlesThread />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </Wrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
