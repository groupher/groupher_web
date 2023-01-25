import { FC, memo } from 'react'

import EVENT from '@/constant/event'
import type { TPost, TAvatarLayout } from '@/spec'

import { send } from '@/utils/signal'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'

import ViewingSign from '../../ViewingSign'

import Header from './Header'
import Footer from './Footer'

import { Wrapper, Main, DigestWrapper } from '../../styles/upvote_fist_layout/desktop_view'

type TProps = {
  article: TPost
  avatarLayout: TAvatarLayout
  // onUserSelect?: (obj: TUser) => void
  // onAuthorSelect?: (obj: TAccount) => void
}

const DigestView: FC<TProps> = ({ article, avatarLayout }) => {
  return (
    <Wrapper>
      <ArticleReadLabel article={article} />
      <ArticlePinLabel article={article} />
      <ViewingSign article={article} />
      <Main>
        <Header article={article} />
        <DigestWrapper onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>
          {article.digest}
        </DigestWrapper>
        <Footer article={article} avatarLayout={avatarLayout} />
      </Main>
    </Wrapper>
  )
}

export default memo(DigestView)
