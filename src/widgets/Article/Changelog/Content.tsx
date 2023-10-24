/*
 *
 * general ArticleContent for Changelog, Job, Blog, Radar ..
 *
 */

import { FC, useRef } from 'react'
import dynamic from 'next/dynamic'

import type { TChangelog } from '@/spec'
import { buildLog } from '@/logger'

import ArtimentBody from '@/widgets/ArtimentBody'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
// import ViewportTracker from '@/widgets/ViewportTracker'

import { Wrapper, InnerWrapper, ArticleWrapper, CommentsWrapper } from '../styles/changelog/content'

/* eslint-disable-next-line */
const log = buildLog('C:ChangelogContent')

const Comments = dynamic(() => import('@/containers/unit/Comments'), {
  /* eslint-disable react/display-name */
  loading: () => <LavaLampLoading />,
  ssr: false,
})

type TProps = {
  article: TChangelog
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
