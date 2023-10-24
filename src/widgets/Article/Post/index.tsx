import { FC, useState } from 'react'

import useViewingArticle from '@/hooks/useViewingArticle'
import useMetric from '@/hooks/useMetric'

import Header from '@/widgets/CommunityDigest/HeaderLayout'
import ViewportTracker from '@/widgets/ViewportTracker'

import Digest from './Digest'
import Content from './Content'
import SideInfo from './SideInfo'

import { Wrapper, InnerWrapper, HeaderWrapper, BannerContent, Main } from '../styles/post'

const Post: FC = () => {
  const { article } = useViewingArticle()

  const metric = useMetric()

  const [inViewport, setInViewport] = useState(false)

  return (
    <Wrapper metric={metric}>
      {/* <FixedHeader show={!inViewport} article={viewingArticle} metric={metric} /> */}
      <InnerWrapper metric={metric}>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BannerContent>
          <Main>
            <Digest article={article} />
            <Content article={article} />
          </Main>
          <SideInfo article={article} />
        </BannerContent>
      </InnerWrapper>
      <ViewportTracker onEnter={() => setInViewport(true)} onLeave={() => setInViewport(false)} />
    </Wrapper>
  )
}

export default Post
