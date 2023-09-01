import { FC, memo } from 'react'

import EVENT from '@/constant/event'
import type { TPost, TAvatarLayout } from '@/spec'

import { send } from '@/utils/signal'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import { Wrapper, Main, DigestWrapper } from '../../styles/quora_layout/desktop_view'

type TProps = {
  article: TPost
  avatarLayout: TAvatarLayout
  // onUserSelect?: (obj: TUser) => void
  // onAuthorSelect?: (obj: TAccount) => void
}

const DesktopView: FC<TProps> = ({ article, avatarLayout }) => {
  return (
    <Wrapper onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>
      <ArticleReadLabel article={article} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} top={40} />
      <Main>
        <Header article={article} />
        <DigestWrapper>{article.digest}</DigestWrapper>
        <Footer article={article} avatarLayout={avatarLayout} />
      </Main>
    </Wrapper>
  )
}

export default memo(DesktopView)
