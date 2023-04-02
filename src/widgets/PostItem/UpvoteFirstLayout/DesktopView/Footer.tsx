import { memo, FC } from 'react'

import type { TPost, TAvatarLayout } from '@/spec'
import { UPVOTE_LAYOUT } from '@/constant/layout'

import Upvote from '@/widgets/Upvote'
import { Space } from '@/widgets/Common'
import ViewsCount from '@/widgets/ViewsCount'
import ArticleCatState from '@/widgets/ArticleCatState'

import { Wrapper } from '../../styles/upvote_fist_layout/desktop_view/footer'

type TProps = {
  article: TPost
  avatarLayout: TAvatarLayout
}

const Footer: FC<TProps> = ({ article, avatarLayout }) => {
  const { upvotesCount, meta, viewerHasUpvoted } = article

  return (
    <Wrapper>
      <Upvote
        count={upvotesCount}
        avatarList={meta.latestUpvotedUsers}
        viewerHasUpvoted={viewerHasUpvoted}
        type={UPVOTE_LAYOUT.GENERAL}
        avatarLayout={avatarLayout}
        left={-2}
        top={-1}
      />

      {article.cat && <ArticleCatState left={18} cat={article.cat} state={article.state} />}

      <Space right={18} />
      <ViewsCount count={article.views} />
    </Wrapper>
  )
}

export default memo(Footer)
