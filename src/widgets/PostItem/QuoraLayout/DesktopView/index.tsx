import { FC, memo } from 'react'

import type { TPost } from '@/spec'

import { previewArticle } from '@/signal'

import ArticlePinLabel from '@/widgets/ArticlePinLabel'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import { Wrapper, Main, Digest } from '../../styles/quora_layout/desktop_view'

type TProps = {
  article: TPost
}

const DesktopView: FC<TProps> = ({ article }) => {
  return (
    <Wrapper>
      <ArticlePinLabel isPinned={article.isPinned} top={42} />
      <ViewingSign article={article} top={38} left={article.isPinned ? -48 : -24} />

      <Main>
        <Header article={article} />
        <Digest onClick={() => previewArticle(article)}>{article.digest}</Digest>
        <Footer article={article} />
      </Main>
    </Wrapper>
  )
}

export default memo(DesktopView)
