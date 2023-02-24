import { FC, memo } from 'react'
import TimeAgo from 'timeago-react'

import type { TPost, TAccount } from '@/spec'

import DotDivider from '@/widgets/DotDivider'

import { Wrapper } from '../../styles/upvote_fist_layout/mobile_view/header'

type TProps = {
  article: TPost
  onAuthorSelect?: (obj: TAccount) => void
}

const Header: FC<TProps> = ({ article, onAuthorSelect }) => {
  return (
    <Wrapper>
      <div onClick={() => onAuthorSelect(article.author)}>{article?.author.nickname}</div>
      <DotDivider radius={2} space={8} />
      <TimeAgo datetime={article.insertedAt} locale="zh_CN" />
    </Wrapper>
  )
}

export default memo(Header)
