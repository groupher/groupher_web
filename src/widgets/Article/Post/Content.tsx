/*
 *
 * general ArticleContent for Post, Job, Blog, Radar ..
 *
 */

import { FC, useRef } from 'react'
import dynamic from 'next/dynamic'

import type { TPost } from '@/spec'
import { buildLog } from '@/logger'

import ArtimentBody from '@/widgets/ArtimentBody'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
// import ViewportTracker from '@/widgets/ViewportTracker'

import { Wrapper, InnerWrapper, ArticleWrapper, CommentsWrapper } from '../styles/post/content'

/* eslint-disable-next-line */
const log = buildLog('C:PostContent')

const Comments = dynamic(() => import('@/containers/unit/Comments'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

type TProps = {
  article: TPost
}

const Content: FC<TProps> = ({ article }) => {
  const ref = useRef()

  return (
    <Wrapper>
      <InnerWrapper>
        {/* <ViewportTracker
          onEnter={() => checkAnchor(ref?.current)}
          onLeave={() => checkAnchor(ref?.current)}
        /> */}
        <ArticleWrapper ref={ref}>
          {/* {!!article.linkAddr && <Linker src={article.linkAddr} bottom={22} />} */}
          <ArtimentBody document={article.document} />
        </ArticleWrapper>

        {/* <ViewportTracker
            onEnter={() => checkAnchor(ref?.current)}
            onLeave={() => checkAnchor(ref?.current)}
          /> */}
        <CommentsWrapper>
          <Comments />
        </CommentsWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Content
