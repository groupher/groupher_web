/*
 *
 * general ArticleContent for Post, Job, Blog, Radar ..
 *
 */

import { FC, useRef } from 'react'
import dynamic from 'next/dynamic'

import { buildLog } from '@/logger'
import { bond } from '@/mobx'

import useMetric from '@/hooks/useMetric'
// import ArticleSticker from '@/containers/tool/ArticleSticker'
// import ArticleFooter from '@/containers/unit/ArticleFooter'
import ArtimentBody from '@/widgets/ArtimentBody'
// import Comments from '@/containers/unit/Comments'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import ViewportTracker from '@/widgets/ViewportTracker'

import SideInfo from './SideInfo'

import type { TStore } from '../store'

import {
  Wrapper,
  InnerWrapper,
  ArticleWrapper,
  CommentsWrapper,
} from '../styles/desktop_view/article_layout'

import { useInit, checkAnchor } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('C:PostContent')

const Comments = dynamic(() => import('@/containers/unit/Comments'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

type TProps = {
  articleContent?: TStore
  testid?: string
}

const ArticleContentContainer: FC<TProps> = ({ articleContent: store, testid }) => {
  useInit(store)
  const metric = useMetric()

  const { viewingArticle: article } = store
  const ref = useRef()

  if (!article.id) return null

  return (
    <Wrapper testid={testid} metric={metric}>
      <InnerWrapper metric={metric}>
        {/* <ViewportTracker
          onEnter={() => checkAnchor(ref?.current)}
          onLeave={() => checkAnchor(ref?.current)}
        /> */}
        <div>
          <ArticleWrapper ref={ref}>
            {/* {!!article.linkAddr && <Linker src={article.linkAddr} bottom={22} />} */}
            <ArtimentBody document={article.document} />
          </ArticleWrapper>

          <ViewportTracker
            onEnter={() => checkAnchor(ref?.current)}
            onLeave={() => checkAnchor(ref?.current)}
          />
          <CommentsWrapper>
            <Comments />
          </CommentsWrapper>
        </div>

        <SideInfo article={article} />
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(ArticleContentContainer, 'articleContent') as FC<TProps>
