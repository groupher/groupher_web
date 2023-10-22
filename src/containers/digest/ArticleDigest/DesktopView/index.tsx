/*
 * ArticleDigest
 */

import { FC } from 'react'
import { isNil } from 'ramda'

import useMetric from '@/hooks/useMetric'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import ViewportTracker from '@/widgets/ViewportTracker'
import FixedHeader from './FixedHeader'
import Header from './Header'
import Layout from './Layout'

import type { TStore } from '../store'
import { Wrapper, InnerWrapper, BannerContent } from '../styles/desktop_view'
import { useInit, inAnchor, outAnchor } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleDigest')

type TProps = {
  articleDigest?: TStore
  testid?: string
}

const ArticleDigestContainer: FC<TProps> = ({
  articleDigest: store,
  testid = 'article-digest',
}) => {
  // const { isMobile } = useMobileDetect()
  useInit(store)
  const metric = useMetric()

  const { viewingArticle, inViewport } = store
  if (isNil(viewingArticle.id)) return null

  return (
    <Wrapper testid={testid} metric={metric}>
      {/* @ts-ignore */}
      {/* {!isMobile && <CollectionFolder />} */}
      {/* @ts-ignore */}
      <FixedHeader show={!inViewport} article={viewingArticle} metric={metric} />
      <InnerWrapper metric={metric}>
        <Header />
        <BannerContent>
          <Layout article={viewingArticle} metric={metric} />
        </BannerContent>
      </InnerWrapper>
      <ViewportTracker onEnter={inAnchor} onLeave={outAnchor} />
    </Wrapper>
  )
}

export default bond(ArticleDigestContainer, 'articleDigest') as FC<TProps>
