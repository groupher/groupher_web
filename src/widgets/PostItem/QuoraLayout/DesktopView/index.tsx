import { FC, memo } from 'react'

import type { TPost } from '@/spec'

import { previewArticle } from '@/utils/signal'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
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
    <Wrapper onClick={() => previewArticle(article)}>
      <ArticleReadLabel article={article} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} top={40} />
      <Main>
        <Header article={article} />
        <Digest>{article.digest}</Digest>
        <Footer article={article} />
      </Main>
    </Wrapper>
  )
}

export default memo(DesktopView)