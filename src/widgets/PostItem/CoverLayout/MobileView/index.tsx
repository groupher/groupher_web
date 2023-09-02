import { FC, memo } from 'react'

import type { TPost } from '@/spec'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

import { Wrapper } from '../../styles/cover_layout/mobile_view'

type TProps = {
  article: TPost
}

const MobileView: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <Header article={article} />
      <Body article={article} />
      <Footer article={article} />
    </Wrapper>
  )
}

export default memo(MobileView)
