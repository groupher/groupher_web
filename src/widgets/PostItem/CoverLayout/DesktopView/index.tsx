import { FC, memo, useState, useEffect } from 'react'

import EVENT from '@/constant/event'
import type { TPost } from '@/spec'

import { send } from '@/utils/signal'
import { mockImage } from '@/utils/mock'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import {
  Wrapper,
  CoverWrapper,
  CoverImg,
  Main,
  DigestWrapper,
} from '../../styles/cover_layout/desktop_view'

type TProps = {
  article: TPost
  // onUserSelect?: (obj: TUser) => void
  // onAuthorSelect?: (obj: TAccount) => void
}

const DigestView: FC<TProps> = ({ article }) => {
  const [coverImg, setCoverImg] = useState('')

  useEffect(() => {
    setCoverImg(mockImage())
  }, [])

  return (
    <Wrapper>
      <ArticleReadLabel article={article} top={8} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} top={8} />
      <CoverWrapper>
        <CoverImg src={coverImg} />
      </CoverWrapper>
      <Main>
        <Header article={article} />
        <DigestWrapper onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>
          {article.digest}
        </DigestWrapper>
        <Footer article={article} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)
