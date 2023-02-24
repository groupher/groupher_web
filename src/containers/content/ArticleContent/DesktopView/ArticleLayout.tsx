/*
 *
 * general ArticleContent for Post, Job, Blog, Radar ..
 *
 */

import { FC, useRef } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'
import dynamic from 'next/dynamic'

import type { TMetric } from '@/spec'
import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import ArticleSticker from '@/containers/tool/ArticleSticker'
// import ArticleFooter from '@/containers/unit/ArticleFooter'
import ArtimentBody from '@/widgets/ArtimentBody'
// import Comments from '@/containers/unit/Comments'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import Linker from '@/widgets/Linker'

import ViewportTracker from '@/widgets/ViewportTracker'

import type { TStore } from '../store'

import {
  Wrapper,
  InnerWrapper,
  MainWrapper,
  SidebarWrapper,
  ArticleWrapper,
  CommentsWrapper,
} from '../styles/desktop_view/article_layout'

import { useInit, checkAnchor } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('C:PostContent')

const ArticleFooter = dynamic(() => import('@/containers/unit/ArticleFooter'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

const Comments = dynamic(() => import('@/containers/unit/Comments'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

type TProps = {
  articleContent?: TStore
  testid?: string
  metric?: TMetric
}

const ArticleContentContainer: FC<TProps> = ({ articleContent: store, metric, testid }) => {
  useInit(store)
  const { isMobile } = useMobileDetect()

  const { viewingArticle: article } = store
  const ref = useRef()

  if (!article.id) return null

  return (
    <Wrapper testid={testid}>
      <InnerWrapper>
        <ViewportTracker
          onEnter={() => checkAnchor(ref?.current)}
          onLeave={() => checkAnchor(ref?.current)}
        />
        <MainWrapper metric={metric}>
          <ArticleWrapper ref={ref}>
            {/* {!!article.linkAddr && <Linker src={article.linkAddr} bottom={22} />} */}
            <ArtimentBody document={article.document} />
            <ArticleFooter />
          </ArticleWrapper>

          <ViewportTracker
            onEnter={() => checkAnchor(ref?.current)}
            onLeave={() => checkAnchor(ref?.current)}
          />
          <CommentsWrapper>
            <Comments />
          </CommentsWrapper>
        </MainWrapper>
        {!isMobile && (
          <SidebarWrapper>
            <ArticleSticker metric={metric} />
          </SidebarWrapper>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(ArticleContentContainer, 'articleContent') as FC<TProps>
