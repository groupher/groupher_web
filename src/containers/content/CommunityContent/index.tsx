/*
 * CommunityContent
 */

import { FC } from 'react'

import { bond } from '@/utils/mobx'

import CommunityDigest from '@/containers/digest/CommunityDigest'
import ThreadContent from './ThreadContent'

import type { TStore } from './store'
import { useInit } from './logic'

import { Wrapper, InnerWrapper, ContentWrapper } from './styles'

type TProps = {
  communityContent?: TStore
}

const CommunityContentContainer: FC<TProps> = ({ communityContent: store }) => {
  useInit(store)

  const { curThread: thread } = store

  return (
    <Wrapper testid="community-content">
      <CommunityDigest />
      <InnerWrapper>
        <ContentWrapper>
          <ThreadContent thread={thread} />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(CommunityContentContainer, 'communityContent') as FC<TProps>
