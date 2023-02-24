import { FC, memo } from 'react'
import dynamic from 'next/dynamic'

import type { TPost, TAccount } from '@/spec'

import Header from './Header'
import Body from './Body'
// import Footer from './Footer'

import { Wrapper } from '../../styles/upvote_fist_layout/mobile_view'

const Footer = dynamic(() => import('./Footer'), {
  ssr: false,
})

type TProps = {
  article: TPost
  onAuthorSelect?: (obj: TAccount) => void
}

const MobileView: FC<TProps> = ({ article, onAuthorSelect }) => {
  return (
    <Wrapper>
      <Header article={article} onAuthorSelect={onAuthorSelect} />
      <Body article={article} />
      <Footer article={article} />
    </Wrapper>
  )
}

export default memo(MobileView)
