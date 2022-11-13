/*
 * CommunityContent
 */

import { FC } from 'react'
import { includes } from 'ramda'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import { bond } from '@/utils/mobx'
import { ARTICLE_THREAD } from '@/constant'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import ThreadContent from './ThreadContent'

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

const CommunityContentContainer: FC<TProps> = ({ communityContent: store }) => {
  useInit(store)

  const { isMobile } = useMobileDetect()
  const { curThread: thread } = store

  const isMobileCardsView =
    isMobile && includes(thread, [ARTICLE_THREAD.JOB, ARTICLE_THREAD.RADAR])

  return (
    <Wrapper testid="community-content">
      <CommunityDigest />
      {isMobileCardsView ? (
        <MobileCardsWrapper>
          <ContentWrapper>
            <ThreadContent thread={thread} />
          </ContentWrapper>
        </MobileCardsWrapper>
      ) : (
        <InnerWrapper>
          <ContentWrapper>
            <ThreadContent thread={thread} />
          </ContentWrapper>
        </InnerWrapper>
      )}
    </Wrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
