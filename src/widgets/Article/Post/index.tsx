import { FC, useState } from 'react'

// import Header from '@/widgets/CommunityDigest/HeaderLayout'
import ViewportTracker from '@/widgets/ViewportTracker'

import Digest from './Digest'
import Content from './Content'
import SideInfo from './SideInfo'

import { Wrapper, InnerWrapper, HeaderWrapper, BannerContent, Main } from '../styles/post'

const Post: FC = () => {
  const [inViewport, setInViewport] = useState(false)

  return (
    <>
      <BannerContent>
        <Main>
          <Digest />
          <Content />
        </Main>
        <SideInfo />
      </BannerContent>
      <ViewportTracker onEnter={() => setInViewport(true)} onLeave={() => setInViewport(false)} />
    </>
  )
}

export default Post
