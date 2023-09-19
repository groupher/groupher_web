import { FC, memo } from 'react'

import type { TPost } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant/layout'
import EVENT from '@/constant/event'

import { send } from '@/signal'

import Upvote from '@/widgets/Upvote'

import Header from './Header'
import Footer from './Footer'

import {
  Wrapper,
  UpvoteWrapper,
  Main,
  DigestWrapper,
} from '../../styles/minimal_layout/mobile_view'

type TProps = {
  article: TPost
  // onUserSelect?: (obj: TUser) => void
}

const DigestView: FC<TProps> = ({ article }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper>
      <UpvoteWrapper>
        <Upvote
          count={upvotesCount}
          avatarList={meta.latestUpvotedUsers}
          viewerHasUpvoted={viewerHasUpvoted}
          type={UPVOTE_LAYOUT.POST_MINIMAL}
          left={-2}
          top={-1}
        />
      </UpvoteWrapper>
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
